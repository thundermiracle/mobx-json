import { action, observable } from 'mobx';

import plugins from '../plugins';
import _JsonFormStore from './private/_JsonFormStore';

class JsonFormStore {
  /**
   * Private methods class
   */
  private _jsonFormPrivate = new _JsonFormStore();

  // Flatten fields For Quicker Search(References of this.fields)
  private _FlattenFields: any;

  @observable
  fields: any = {};

  /**
   *
   * @param fieldsProps
   * @param extraMustHaveKeys
   */
  constructor(fieldsProps: any, extraMustHaveKeys = undefined) {
    if (fieldsProps != null) {
      this.initFieldsByJsonBlueprint(fieldsProps, extraMustHaveKeys);
    }
  }

  /**
   * @param dataObj
   */
  setFieldsValue = (dataObj: null | undefined | any) => {
    if (dataObj == null) {
      return;
    }

    Object.keys(dataObj).forEach(key => {
      if (this.fields[key] != null) {
        this.fields[key].value = dataObj[key];
      }
    });
  };

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
    this._FlattenFields = this._jsonFormPrivate.getFlattenAllFieldsReferences();
  };

  /**
   * [Input checker]
   *
   * [ONLY affect field.error which is modified now]
   */
  @action
  onFieldChangeCheckAll = (fieldName: string, value: any) => {
    // const field = this._formMixinPrivate.getFieldByNameNested(fieldName, this.fields);
    const field = this._jsonFormPrivate.getFieldByName(
      fieldName,
      this._FlattenFields,
    );
    if (!field) return;

    const { attrs } = field;
    attrs.value = value;

    const key = attrs.name;

    const checkData = this._getAvailableValueRulesKeyLabel();

    const errors = plugins.validator.validate(checkData.value, checkData.rule);
    const errorMsg = errors.first(key);

    attrs.error = errorMsg === false ? null : errorMsg;
  };

  /**
   * [Input Check]
   * ONLY affect the field which is modified now.
   */
  @action
  onFieldChange = (fieldName: string, value: any) => {
    // const field = this._formMixinPrivate.getFieldByNameNested(fieldName, this.fields);
    const field = this._jsonFormPrivate.getFieldByName(
      fieldName,
      this._FlattenFields,
    );
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
      [key]: attrs.rule,
    };

    const errors = plugins.validator.validate(datas, rules);

    const errorMsg = errors.first(key);
    attrs.error = errorMsg === false ? null : errorMsg;
  };

  /**
   * [Check all fields onSubmit]
   * Affect all fields and apply errormessage to all fields
   */
  @action
  checkAllOnSubmit = () => {
    const checkData = this._getAvailableValueRulesKeyLabel();

    const errors = plugins.validator.validate(checkData.value, checkData.rule);

    // this._formMixinPrivate.setAllFieldsErrorsNested(checkResult.errors, this.fields);
    this._jsonFormPrivate.setAllFieldsErrors(errors, this._FlattenFields);
    return Object.keys(errors).length === 0;
  };

  resetAllFields = () => {
    // this._formMixinPrivate.resetAllFieldsNested(this.fields);
    this._jsonFormPrivate.resetAllFields(this._FlattenFields);
  };

  clearAllErrors = () => {
    // this._formMixinPrivate.setAllFieldsErrorsNested(null, this.fields);
    this._jsonFormPrivate.setAllFieldsErrors(null, this._FlattenFields);
  };

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓Internal Functions↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ //
  /**
   * Do not check if rule was empty
   */
  private _getAvailableValueRulesKeyLabel = () => {
    // const fields = toJS(this.fields);
    // const allvals = this._formMixinPrivate.getFlattenedValuesNested('attrs.value', fields);
    // const allrules = this._formMixinPrivate.getFlattenedValuesNested('settings.rule', fields);
    // const allnames = this._formMixinPrivate.getFlattenedValuesNested('attrs.name', fields);
    const allvals = this._jsonFormPrivate.getFlattenedValues(
      'attrs.value',
      this._FlattenFields,
    );
    const allrules = this._jsonFormPrivate.getFlattenedValues(
      'settings.rule',
      this._FlattenFields,
    );
    const allnames = this._jsonFormPrivate.getFlattenedValues(
      'attrs.name',
      this._FlattenFields,
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
    // const fields = toJS(this.fields);
    // const allvals = this._formMixinPrivate.getFlattenedValuesNested('attrs.value', fields);
    // const allrules = this._formMixinPrivate.getFlattenedValuesNested('settings.rule', fields);
    const allvals = this._jsonFormPrivate.getFlattenedValues(
      'attrs.value',
      this._FlattenFields,
    );
    const allrules = this._jsonFormPrivate.getFlattenedValues(
      'settings.rule',
      this._FlattenFields,
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
