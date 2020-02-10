import { action } from 'mobx';
import getHelper from './getHelper';
import { Fields, Field, AnyObject, SinglePropRule } from '../../JsonFormTypes';

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
    this._invokeFuncToAllFields(this._setFieldError, fields);

    // set default values
    this._invokeFuncToAllFields(this._resetDefaultValue, fields);
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
   * propRule MUST be 'propName,propValue:targetColName,targetColVal | ...'
   *
   * which means if (targetColName's value === targetColVal),
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

  @action
  propagatePropValue = (
    field: Field,
    propName: string,
    propValue: any,
  ): void => {
    field.attrs[propName] = propValue;

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
    }
  };

  @action
  private _setFieldError = (field: Field, errors: AnyObject = {}): void => {
    const [errorMsg] = errors[field.attrs.name] || [];
    field.attrs.error = errorMsg || '';
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

  private _initFieldAttrsByPropRule = (field: Field, fields: Fields): void => {
    const { propRule } = field.settings;

    if (propRule == null) {
      return;
    }

    const flattenPropRules = getHelper.flattenPropRule(propRule);
    flattenPropRules.forEach(
      ({ prop, targetColName, targetColValue }: SinglePropRule) => {
        const targetField = getHelper.getFieldByName(fields, targetColName);

        if (
          targetField != null &&
          targetField.attrs.value.toString() === targetColValue.toString()
        ) {
          const [propName, propValue] = prop;
          this.propagatePropValue(field, propName, propValue);
        }
      },
    );
  };
}

const setHelper = new SetHelper();

export default setHelper;
