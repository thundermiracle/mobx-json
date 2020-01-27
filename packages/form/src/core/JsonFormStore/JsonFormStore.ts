import { action, observable, toJS } from 'mobx';

import plugins from '../plugins';
import getHelper from './private/getHelper';
import setHelper from './private/setHelper';
import { Fields } from './types';

class JsonFormStore {
  @observable
  fields: Fields = {};

  /**
   *
   * @param fieldsProps
   * @param extraMustHaveKeys
   */
  constructor(fieldsProps?: any, extraMustHaveKeys = undefined) {
    if (fieldsProps != null) {
      this.initFieldsByJsonBlueprint(fieldsProps, extraMustHaveKeys);
    }
  }

  /**
   * Analyze json blueprint and apply settings to this.fields
   *
   *  @param {any} fieldsProp
   *  @param {any} extraMustHaveKeys
   */
  initFieldsByJsonBlueprint = (fieldsProp: any, extraMustHaveKeys = []) => {
    this.fields = getHelper.initObservableFields(
      fieldsProp.fields,
      plugins.itemsSource,
      extraMustHaveKeys,
    );
  };

  /**
   * @param dataObj
   */
  setData = (dataObj: null | undefined | any): void => {
    if (dataObj == null) {
      return;
    }

    setHelper.setDataToAllFields(this.fields, dataObj);
  };

  /**
   * get data for submit
   */
  getData = () => {
    return getHelper.getFlattenedValues(this.fields);
  };

  /**
   * [Input checker]
   *
   * [ONLY affect field.error which is modified now]
   */
  @action
  onFieldChangeCheckAll = (fieldName: string, value: any) => {
    const field = getHelper.getFieldByName(this.fields, fieldName);
    if (!field) return;

    const { attrs } = field;
    attrs.value = value;

    const checkData = getHelper.getAvailableValueRulesKeyLabel(this.fields);

    const errors = plugins.validator.validate(checkData.value, checkData.rule);
    setHelper.setAllFieldsErrors(errors, this.fields);
  };

  /**
   * [Input Check]
   * ONLY affect the field which is modified now.
   */
  @action
  onFieldChange = (fieldName: string, value: any) => {
    const field = getHelper.getFieldByName(this.fields, fieldName);
    if (!field) return;

    const { attrs, settings } = field;
    attrs.value = getHelper.getTypedValue(value, settings.valueType);

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

    const errors = plugins.validator.validate(datas, rules);

    const [errorMsg] = errors[key] || [];
    attrs.error = errorMsg || '';
  };

  /**
   * [Check all fields onSubmit]
   * Affect all fields and apply errormessage to all fields
   */
  @action
  checkAllOnSubmit = () => {
    const checkData = getHelper.getAvailableValueRulesKeyLabel(this.fields);

    const errors = plugins.validator.validate(checkData.value, checkData.rule);

    setHelper.setAllFieldsErrors(errors, this.fields);
    return Object.keys(errors).length === 0;
  };

  resetAllFields = () => {
    setHelper.resetAllFields(this.fields);
  };

  clearAllErrors = () => {
    setHelper.setAllFieldsErrors(null, this.fields);
  };
}

export default JsonFormStore;
