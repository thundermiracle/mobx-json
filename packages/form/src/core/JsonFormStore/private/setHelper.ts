import { action } from 'mobx';
import { Fields, Field, AnyObject } from '../../JsonFormTypes';

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
  setAllFieldsErrors = (fields: Fields, errors: AnyObject | null): void => {
    this._invokeFuncToAllFields(this._setFieldError, fields, errors);
  };

  private _setValToField = (
    field: Field,
    key: string,
    dataObj: AnyObject,
  ): void => {
    if (dataObj[key] != null) {
      field.attrs.value = dataObj[key];
    }
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
        this._invokeFuncToAllFields(func, field.fields, ...funcArg);
      } else {
        func(field, key, ...funcArg);
      }
    });
  };

  private _setFieldError = (
    field: Field,
    key: string,
    errors: AnyObject = {},
  ): void => {
    const [errorMsg] = errors[key] || [];
    field.attrs.error = errorMsg || '';
  };

  private _resetDefaultValue = (field: Field): void => {
    field.attrs.value = field.attrs.defaultValue || field.attrs.value;
  };
}

const setHelper = new SetHelper();

export default setHelper;
