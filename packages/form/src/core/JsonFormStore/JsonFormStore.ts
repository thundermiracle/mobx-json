import { action, observable, toJS } from 'mobx';

import plugins from '../plugins';
import _JsonFormStore from './private/_JsonFormStore';

class JsonFormStore {
  /**
   * Private methods class
   */
  private _jsonFormPrivate = new _JsonFormStore();

  @observable
  fields: any = {};

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
    this.fields = this._jsonFormPrivate.initObservableFields(
      fieldsProp.fields,
      extraMustHaveKeys,
    );
  };

  /**
   * @param dataObj
   */
  setData = (dataObj: null | undefined | any) => {
    if (dataObj == null) {
      return;
    }

    this._jsonFormPrivate.setDataToAllFields(this.fields, dataObj);
  };

  /**
   * get data for submit
   */
  getData = () => {
    return this._jsonFormPrivate.getFlattenedValues(this.fields);
  };

  /**
   * [Input checker]
   *
   * [ONLY affect field.error which is modified now]
   */
  @action
  onFieldChangeCheckAll = (fieldName: string, value: any) => {
    const field = this._jsonFormPrivate.getFieldByName(fieldName, this.fields);
    if (!field) return;

    const { attrs } = field;
    attrs.value = value;

    const checkData = this._getAvailableValueRulesKeyLabel();

    const errors = plugins.validator.validate(checkData.value, checkData.rule);
    this._jsonFormPrivate.setAllFieldsErrors(errors, this.fields);
  };

  /**
   * [Input Check]
   * ONLY affect the field which is modified now.
   */
  @action
  onFieldChange = (fieldName: string, value: any) => {
    const field = this._jsonFormPrivate.getFieldByName(fieldName, this.fields);
    if (!field) return;

    const { attrs, settings } = field;
    attrs.value = value;

    const key = attrs.name;

    // check only if rule is exist
    if (settings.rule === null || settings.rule === '') {
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
    const checkData = this._getAvailableValueRulesKeyLabel();

    const errors = plugins.validator.validate(checkData.value, checkData.rule);

    this._jsonFormPrivate.setAllFieldsErrors(errors, this.fields);
    return Object.keys(errors).length === 0;
  };

  resetAllFields = () => {
    this._jsonFormPrivate.resetAllFields(this.fields);
  };

  clearAllErrors = () => {
    this._jsonFormPrivate.setAllFieldsErrors(null, this.fields);
  };

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓Internal Functions↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ //
  /**
   * Do not check if rule was empty
   */
  private _getAvailableValueRulesKeyLabel = () => {
    const fields = toJS(this.fields);
    const allvals = this._jsonFormPrivate.getFlattenedValues(
      fields,
      'attrs.value',
    );
    const allrules = this._jsonFormPrivate.getFlattenedValues(
      fields,
      'settings.rule',
    );
    const allnames = this._jsonFormPrivate.getFlattenedValues(
      fields,
      'attrs.name',
    );

    const vals: any = {};
    const rules: any = {};

    Object.keys(allvals).forEach(key => {
      if (allrules[key] != null && allrules[key] !== '') {
        vals[allnames[key]] = allvals[key];
        rules[allnames[key]] = allrules[key];
      }
    });

    return { value: vals, rule: rules };
  };

  /**
   * Do not check if rule was empty
   */
  private _getAvailableValueRulesKeyField = () => {
    const fields = toJS(this.fields);
    const allvals = this._jsonFormPrivate.getFlattenedValues(
      fields,
      'attrs.value',
    );
    const allrules = this._jsonFormPrivate.getFlattenedValues(
      fields,
      'settings.rule',
    );
    const vals: any = {};
    const rules: any = {};

    Object.keys(allvals).forEach(key => {
      if (allrules[key] != null && allrules[key] !== '') {
        vals[key] = allvals[key];
        rules[key] = allrules[key];
      }
    });

    return { value: vals, rule: rules };
  };
}

export default JsonFormStore;
