import { action } from 'mobx';
import { without, append, uniq } from 'ramda';
import compute from 'lib/compute';

import getHelper from './getHelper';
import {
  Fields,
  Field,
  AnyObject,
  SinglePropRule,
  SingleComputeRule,
} from '../../JsonFormTypes';

/**
 * SIDE_EFFECT
 * For mobx's observable pattern,
 * modify properties in fields directly
 */
class SetHelper {
  setDataToAllFields = (fields: Fields, dataObj: AnyObject): void => {
    this._invokeFuncToAllFields(this._setValToField, fields, dataObj);
  };

  /**
   * reset all fields
   * @param {*} fields
   */
  @action
  resetAllFields = (fields: Fields): void => {
    // clear errors
    this.clearAllErrors(fields);

    // set default values
    this._invokeFuncToAllFields(this._resetDefaultValue, fields);
  };

  @action
  clearAllErrors = (fields: Fields): void => {
    this._invokeFuncToAllFields(this._setFieldError, fields);
  };

  @action
  clearAllData = (fields: Fields): void => {
    this._invokeFuncToAllFields(this._clearFieldData, fields);
  };

  /**
   * set errors to all fields
   * @param {*} fields
   * @param {*} errors
   */
  @action
  setAllFieldsErrors = (fields: Fields, errors: AnyObject | null): void => {
    this._invokeFuncToAllFields(this._setFieldError, fields, errors);
  };

  /**
   * analyze settings.propRule,
   * add extraProps to field if it meets the requirement defined in propRule
   *
   * propRule MUST be 'propName,propValue:targetFieldName,targetFieldVal | ...'
   *
   * which means if (targetFieldName's value === targetFieldVal),
   * change { propName: propValue } in field.attrs directly
   */
  @action
  applyAllFieldsPropRuleForChangedField = (
    fields: Fields,
    changedFieldName: string,
  ): void => {
    const changedField = getHelper.getFieldByName(fields, changedFieldName);

    this._invokeFuncToAllFields(
      this._applyPropRuleForChangedField,
      fields,
      changedField,
    );
  };

  /**
   * analyze settings.computeRule,
   * re-compute the value if the changedFieldName is included in computeRule
   *
   * computeRule MUST be 'computeMethod:col1,col2...:extra | ...'
   *
   */
  @action
  applyAllFieldsComputeRuleForChangedField = (
    fields: Fields,
    changedFieldName: string,
  ): void => {
    this._invokeFuncToAllFields(
      this._applyComputeRuleForChangedField,
      fields,
      changedFieldName,
      fields,
    );
  };

  @action
  propagatePropValue = (
    field: Field,
    propName: string,
    propValue: any,
  ): void => {
    field.attrs[propName] = propValue;
    // add required to rule or remove required from rule
    this._applyRequiredRule(field, propName, propValue);

    if (field.fields) {
      Object.values(field.fields).forEach(fd => {
        this.propagatePropValue(fd, propName, propValue);
      });
    }
  };

  /**
   * analyze every field's propRule and apply props to attrs
   */
  @action
  initAllFieldsAttrsByPropRule = (fields: Fields): void => {
    this._invokeFuncToAllFields(this._initFieldAttrsByPropRule, fields, fields);
  };

  /**
   * analyze every field's propRule and apply props to attrs
   */
  @action
  initAllFieldsAttrsByComputeRule = (fields: Fields): void => {
    this._invokeFuncToAllFields(
      this._initFieldAttrsByComputeRule,
      fields,
      fields,
    );
  };

  /**
   * analyze every field's reloadRule and apply props to attrs
   */
  @action
  initAllFieldsAttrsByReloadRule = (fields: Fields): void => {
    this._invokeFuncToAllFields(this._initFieldAttrsByReloadRule, fields);
  };

  /**
   * analyze settings.reloadRule,
   * trigger asyncLoadItems if the target field meets reloadRule
   *
   * reloadRule MUST be 'fieldName,compare method,value | ...'
   *
   */
  @action
  applyAllFieldsReloadRuleForChangedField = (
    fields: Fields,
    changedFieldName: string,
  ): void => {
    this._invokeFuncToAllFields(
      this._applyReloadRuleForChangedField,
      fields,
      changedFieldName,
    );
  };

  /**
   * Operation for all nested fields
   * @param {*} func
   * @param {*} fields
   * @param {*} funcArg
   */
  @action
  private _invokeFuncToAllFields = (
    func: Function,
    fields: Fields,
    ...funcArg: any
  ): void => {
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (field.fields) {
        // apply to sub fields
        this._invokeFuncToAllFields(func, field.fields, ...funcArg);
      }

      func(field, ...funcArg);
    });
  };

  @action
  private _setValToField = (field: Field, dataObj: AnyObject): void => {
    if (dataObj[field.attrs.name] != null) {
      field.attrs.value = dataObj[field.attrs.name];
      // refresh saved init status
      field.init.value = dataObj[field.attrs.name];
    }
  };

  @action
  private _setFieldError = (field: Field, errors: AnyObject = {}): void => {
    const [errorMsg] = errors[field.attrs.name] || [];
    field.attrs.error = errorMsg || '';
  };

  @action
  private _clearFieldData = (field: Field): void => {
    field.attrs.value =
      field.attrs.defaultValue ||
      getHelper.getDefaultValueByType(field.settings.valueType, true);
  };

  @action
  private _resetDefaultValue = (field: Field): void => {
    field.attrs.value = field.attrs.defaultValue || field.attrs.value;
  };

  @action
  private _applyPropRuleForChangedField = (
    field: Field,
    changedField: Field,
  ): void => {
    const { propRule } = field.settings;
    if (propRule == null) {
      return;
    }

    const {
      name: changedFieldName,
      value: changedFieldValue,
    } = changedField.attrs;
    const extraProps = getHelper.getExtraPropsByPropRule(
      propRule,
      changedFieldName,
      changedFieldValue,
      field.init,
    );

    // mutate field to trigger rendering
    Object.keys(extraProps).forEach(key => {
      this.propagatePropValue(field, key, extraProps[key]);
    });
  };

  @action
  private _applyComputeRuleForChangedField = (
    field: Field,
    changedFieldName: string,
    fields: Fields,
    forceApply = false,
  ): void => {
    const { computeRule } = field.settings;
    if (computeRule == null) {
      return;
    }

    const allComputeRules = getHelper.flattenComputeRule(computeRule);
    allComputeRules.forEach(
      ({ method, targetFields, extra }: SingleComputeRule) => {
        if (forceApply || targetFields.includes(changedFieldName)) {
          // target field is changed, re-compute
          const targetFieldsVal = getHelper.getTargetFieldsVal(
            fields,
            targetFields,
          );

          field.attrs.value = compute(method, targetFieldsVal, extra);
        }
      },
    );
  };

  @action
  private _initFieldAttrsByPropRule = (field: Field, fields: Fields): void => {
    const { propRule } = field.settings;

    if (propRule == null) {
      return;
    }

    const flattenPropRules = getHelper.flattenPropRule(propRule);
    flattenPropRules.forEach(
      ({ prop, targetFieldName, targetFieldValue }: SinglePropRule) => {
        const targetField = getHelper.getFieldByName(fields, targetFieldName);

        if (
          targetField != null &&
          targetField.attrs.value.toString() === targetFieldValue.toString()
        ) {
          const [propName, propValue] = prop;
          this.propagatePropValue(field, propName, propValue);
        }
      },
    );
  };

  @action
  private _initFieldAttrsByComputeRule = (
    field: Field,
    fields: Fields,
  ): void => {
    this._applyComputeRuleForChangedField(field, '', fields, true);
  };

  @action
  private _applyRequiredRule = (
    field: Field,
    propName: string,
    propValue: boolean,
  ): void => {
    if (propName === 'required') {
      let rulesArr = (field.settings.rule || '').split('|');
      if (propValue) {
        // required:true add to rule
        rulesArr = append('required', rulesArr);
      } else {
        rulesArr = without(['required'], rulesArr);
      }

      field.settings.rule = uniq(rulesArr)
        .filter(x => x !== '')
        .join('|');
    }
  };

  @action
  private _initFieldAttrsByReloadRule = (field: Field): void => {
    this._applyReloadRuleForChangedField(field, '', true);
  };

  @action
  private _applyReloadRuleForChangedField = (
    field: Field,
    changedFieldName: string,
    forceReload = false,
  ): void => {
    const { reloadRule } = field.settings;
    const { asyncLoadItems, reloadOnInput } = field.attrs;
    if (
      reloadRule == null ||
      asyncLoadItems == null ||
      reloadOnInput === true
    ) {
      return;
    }

    const fieldsNameMeetRule = getHelper.getFieldNamesByReloadRule(reloadRule);

    if (forceReload || fieldsNameMeetRule.includes(changedFieldName)) {
      // // clear value
      // field.attrs.value = '';
      // trigger asyncLoadItems
      field.attrs.forceLoadOnce = {};
    }
  };
}

const setHelper = new SetHelper();

export default setHelper;
