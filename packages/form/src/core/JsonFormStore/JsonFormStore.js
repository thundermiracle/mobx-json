import { action, observable } from 'mobx';

import plugins from '../plugins';
import _JsonFormStore from './private/_JsonFormStore';

class JsonFormStore {
  /**
   * Private methods class
   */
  _jsonFormPrivate = new _JsonFormStore();

  // Flatten fields For Quicker Search(References of form.fields)
  _FlattenFormFields;

  @observable
  form = {
    fields: {},
    meta: {
      isValid: true,
      error: '',
    },
  };

  setValueByArray = dataArray => {
    if (dataArray == null) {
      return;
    }

    Object.keys(dataArray).forEach(key => {
      if (this.form.fields[key] != null) {
        this.form.fields[key].value = dataArray[key];
      }
    });
  };

  /**
   * Analyze json blueprint and apply settings to this.form.fields
   *
   *  @param {any} fieldsProp
   *  @param {any} extraMustHaveKeys
   */
  initFieldsByJsonBlueprint = (fieldsProp, extraMustHaveKeys = []) => {
    this.form.fields = this._jsonFormPrivate.initObservableFields(
      fieldsProp.fields,
      extraMustHaveKeys,
    );
    this._FlattenFormFields = this._jsonFormPrivate.getFlattenAllFieldsReferences();
  };

  /**
   * [Input checker]
   * Check all fields, if failed this.form.meta.isValid will be set to false.
   * [ONLY affect field.error which is modified now]
   * [this.form.meta.isValid is for controlling Submit Button]
   */
  @action
  onFieldChangeCheckAll = (fieldName, value) => {
    // const field = this._formMixinPrivate.getFieldByNameNested(fieldName, this.form.fields);
    const field = this._jsonFormPrivate.getFieldByName(
      fieldName,
      this._FlattenFormFields,
    );
    if (!field) return;

    const { attrs } = field;
    attrs.value = value;

    const key = attrs.name;

    const checkData = this._getAvailableValueRulesKeyLabel();

    const errors = plugins.validator.validate(checkData.value, checkData.rule);
    const errorMsg = errors.first(key);

    this.form.meta.isValid = Object(errors).length > 0;
    attrs.error = errorMsg === false ? null : errorMsg;
  };

  /**
   * [Input Check]
   * ONLY affect the field which is modified now.
   */
  @action
  onFieldChange = (fieldName, value) => {
    // const field = this._formMixinPrivate.getFieldByNameNested(fieldName, this.form.fields);
    const field = this._jsonFormPrivate.getFieldByName(
      fieldName,
      this._FlattenFormFields,
    );
    if (!field) return;

    const { attrs, settings } = field;
    attrs.value = value;

    const key = attrs.name;

    // check only if rule is exist
    if (settings.rule === null || settings.rule === '') {
      return;
    }

    const datas = {};
    const rules = {};

    datas[key] = attrs.value;
    rules[key] = settings.rule;

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

    // this._formMixinPrivate.setAllFieldsErrorsNested(checkResult.errors, this.form.fields);
    this._jsonFormPrivate.setAllFieldsErrors(errors, this._FlattenFormFields);
    return this.form.meta.isValid;
  };

  resetAllFields = () => {
    // this._formMixinPrivate.resetAllFieldsNested(this.form.fields);
    this._jsonFormPrivate.resetAllFields(this._FlattenFormFields);
    this.form.meta.isValid = true;
    this.form.meta.error = '';
  };

  clearAllErrors = () => {
    // this._formMixinPrivate.setAllFieldsErrorsNested(null, this.form.fields);
    this._jsonFormPrivate.setAllFieldsErrors(null, this._FlattenFormFields);
    this.form.meta.isValid = true;
    this.form.meta.error = '';
  };

  @action
  setError = errMsg => {
    this.form.meta.error = errMsg;
  };

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓Internal Functions↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ //
  /**
   * Do not check if rule was empty
   */
  _getAvailableValueRulesKeyLabel = () => {
    // const fields = toJS(this.form.fields);
    // const allvals = this._formMixinPrivate.getFlattenedValuesNested('attrs.value', fields);
    // const allrules = this._formMixinPrivate.getFlattenedValuesNested('settings.rule', fields);
    // const allnames = this._formMixinPrivate.getFlattenedValuesNested('attrs.name', fields);
    const allvals = this._jsonFormPrivate.getFlattenedValues(
      'attrs.value',
      this._FlattenFormFields,
    );
    const allrules = this._jsonFormPrivate.getFlattenedValues(
      'settings.rule',
      this._FlattenFormFields,
    );
    const allnames = this._jsonFormPrivate.getFlattenedValues(
      'attrs.name',
      this._FlattenFormFields,
    );

    const vals = {};
    const rules = {};

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
  _getAvailableValueRulesKeyField = () => {
    // const fields = toJS(this.form.fields);
    // const allvals = this._formMixinPrivate.getFlattenedValuesNested('attrs.value', fields);
    // const allrules = this._formMixinPrivate.getFlattenedValuesNested('settings.rule', fields);
    const allvals = this._jsonFormPrivate.getFlattenedValues(
      'attrs.value',
      this._FlattenFormFields,
    );
    const allrules = this._jsonFormPrivate.getFlattenedValues(
      'settings.rule',
      this._FlattenFormFields,
    );

    const vals = {};
    const rules = {};

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
