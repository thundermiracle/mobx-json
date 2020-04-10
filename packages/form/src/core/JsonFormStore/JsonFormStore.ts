import { action, observable } from 'mobx';

import { pickBy } from 'ramda';
import { isNotNilOrEmpty } from 'lib/utils';
import {
  Fields,
  AnyObject,
  Blueprint,
  BlueprintExtra,
  JsonFormStore as JsonFormStoreClass,
} from '../JsonFormTypes';
import plugins from '../plugins';
import getHelper from './private/getHelper';
import setHelper from './private/setHelper';

class JsonFormStore implements JsonFormStoreClass {
  @observable
  fields: Fields = {};

  /**
   *
   * @param fieldsProps
   */
  constructor(fieldsProps?: Blueprint, fieldsExtraProps?: BlueprintExtra) {
    if (fieldsProps != null) {
      this.initFieldsByJsonBlueprint(fieldsProps, fieldsExtraProps);
    }
  }

  /**
   * Analyze json blueprint and apply settings to this.fields
   *
   *  @param {any} fieldsProp
   */
  @action
  initFieldsByJsonBlueprint = (
    fieldsProp: Blueprint,
    fieldsExtraProps: BlueprintExtra = {},
  ): void => {
    this.fields = getHelper.initObservableFields(
      fieldsProp.fields,
      fieldsExtraProps,
      plugins.itemsSource,
      plugins.iconsMap,
      plugins.serviceContainer,
    );

    this._applyAllRules();
  };

  /**
   * @param dataObj
   */
  setData = (dataObj: null | undefined | any): void => {
    if (dataObj == null) {
      return;
    }

    this.clearAllErrors();

    setHelper.setDataToAllFields(this.fields, dataObj);

    this._applyAllRules();
  };

  /**
   * get data for submit
   */
  getData = (): AnyObject => {
    return getHelper.flattenProps(this.fields);
  };

  getErrors = (): AnyObject => {
    const allColsErrs = getHelper.flattenProps(this.fields, 'attrs.error');
    return pickBy(isNotNilOrEmpty, allColsErrs);
  };

  getFirstErrFieldName = (): string | undefined => {
    const errObj = this.getErrors();
    return Object.keys(errObj)[0];
  };

  /**
   * [Input Check]
   * ONLY affect the field which is modified now.
   */
  @action
  onFieldChange = (
    fieldName: string,
    value: any,
    valueLabel?: string,
  ): void => {
    const field = getHelper.getFieldByName(this.fields, fieldName);
    if (!field) return;

    // apply value
    const { attrs, settings } = field;
    attrs.value = getHelper.getTypedValue(value, settings.valueType);
    if (valueLabel != null) {
      attrs.valueLabel = valueLabel;
    }

    /*
      applyAllFieldsPropRule will get value from field
      MUST be placed after attrs.value was set
      refresh fields' props by propRule
    */
    setHelper.applyAllFieldsPropRuleForChangedField(this.fields, fieldName);

    const key = attrs.name;

    // check only if rule is exist
    if (settings.rule) {
      const datas = {
        [key]: getHelper.getValForCheck(attrs.value, settings.valueType),
      };
      const rules = { [key]: settings.rule };

      const errors = plugins.validator.validate(datas, rules) || {};

      setHelper.setAllFieldsErrors({ [fieldName]: field }, errors);
    }

    if (!attrs.error) {
      // re-compute the field.attrs.value if no error
      setHelper.applyAllFieldsComputeRuleForChangedField(
        this.fields,
        fieldName,
      );
    }

    if (!attrs.error || valueLabel != null) {
      // re-compute the field.attrs.value if no error or valueLabel is not null
      setHelper.applyAllFieldsComputeRuleForChangedField(
        this.fields,
        fieldName,
      );
    }
  };

  /**
   * [Check all fields onSubmit]
   * Affect all fields and apply errormessage to all fields
   */
  @action
  checkAllOnSubmit = (): boolean => {
    const checkData = getHelper.getAvailableValueRulesKeyLabel(this.fields);

    const errors = plugins.validator.validate(checkData.value, checkData.rule);

    setHelper.setAllFieldsErrors(this.fields, errors);
    return Object.keys(errors || {}).length === 0;
  };

  resetAllFields = (): void => {
    setHelper.resetAllFields(this.fields);
  };

  clearAllErrors = (): void => {
    setHelper.clearAllErrors(this.fields);
  };

  clearAllData = (): void => {
    setHelper.clearAllData(this.fields);
    this._applyAllRules();
  };

  revertToInit = (): void => {
    setHelper.revertAllFieldsValue(this.fields);
    this._applyAllRules();
  };

  changeFieldAttrs = (
    fieldName: string,
    attrsName: string,
    attrsValue: any,
  ): void => {
    setHelper.changeFieldAttrs(this.fields, fieldName, attrsName, attrsValue);
  };

  private _applyAllRules = (): void => {
    // analyze propRule & set props if the init data meet the condition
    setHelper.initAllFieldsAttrsByPropRule(this.fields);
    // analyze computeRule & compute value if the init data meet the condition
    setHelper.initAllFieldsAttrsByComputeRule(this.fields);
    // analyze reloadRule & call asyncLoadItems if the init data meet the condition
    setHelper.initAllFieldsAttrsByReloadRule(this.fields);
  };
}

export default JsonFormStore;
