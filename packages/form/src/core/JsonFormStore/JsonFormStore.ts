import { action, observable, toJS } from 'mobx';

import { pickBy } from 'ramda';
import {
  Fields,
  AnyObject,
  Blueprint,
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
  constructor(fieldsProps?: any) {
    if (fieldsProps != null) {
      this.initFieldsByJsonBlueprint(fieldsProps);
    }
  }

  /**
   * Analyze json blueprint and apply settings to this.fields
   *
   *  @param {any} fieldsProp
   */
  @action
  initFieldsByJsonBlueprint = (fieldsProp: Blueprint): void => {
    this.fields = getHelper.initObservableFields(
      fieldsProp.fields,
      plugins.itemsSource,
      plugins.iconsMap,
    );

    // analyze propRule & set props if the init data meet the condition
    setHelper.initAllFieldsAttrsByPropRule(this.fields);
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

    // analyze propRule & set props if the init data meet the condition
    setHelper.initAllFieldsAttrsByPropRule(this.fields);
  };

  /**
   * get data for submit
   */
  getData = (): AnyObject => {
    return getHelper.getFlattenedValues(this.fields);
  };

  getErrors = (): AnyObject => {
    const allColsErrs = getHelper.getFlattenedValues(
      this.fields,
      'attrs.error',
    );
    return pickBy(val => val !== '' && val != null, allColsErrs);
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
  onFieldChange = (fieldName: string, value: any): void => {
    const field = getHelper.getFieldByName(this.fields, fieldName);
    if (!field) return;

    // apply value
    const { attrs, settings } = field;
    attrs.value = getHelper.getTypedValue(value, settings.valueType);

    /*
      applyAllFieldsPropRule will get value from field
      MUST be placed after attrs.value was set
      refresh fields' props by propRule
    */
    setHelper.applyAllFieldsPropRuleForChangedField(this.fields, fieldName);

    const key = attrs.name;

    // check only if rule is exist
    if (settings.rule == null || settings.rule === '') {
      return;
    }

    const datas = {
      [key]: attrs.value,
    };
    const rules = {
      [key]: settings.rule,
    };

    const errors = plugins.validator.validate(datas, rules) || {};

    const [errorMsg] = errors[key] || [];
    attrs.error = errorMsg || '';
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
}

export default JsonFormStore;
