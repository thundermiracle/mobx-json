import { action } from 'mobx';

/**
 * SIDE_EFFECT
 * For mobx's observable pattern,
 * modify properties in fields directly
 */
class SetHelper {
  setDataToAllFields = (fields: any, dataObj: any) => {
    this._invokeFuncToAllFields(this._setValToField, fields, dataObj);
  };

  private _setValToField = (field: any, key: string, dataObj: any) => {
    if (dataObj[key] != null) {
      field.attrs.value = dataObj[key];
    }
  };

  /**
   * reset all fields
   * @param {*} fields
   */
  resetAllFields = (fields: any) => {
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
  setAllFieldsErrors = (errors: any, fields: any) => {
    this._invokeFuncToAllFields(this._setFieldError, fields, errors);
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
    fields: any,
    ...funcArg: any
  ) => {
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (field.fields) {
        this._invokeFuncToAllFields(func, field.fields, ...funcArg);
      } else {
        func(field, key, ...funcArg);
      }
    });
  };

  /* *************************************************************** */
  /* End of nested fields methods                                    */
  /* *************************************************************** */

  private _setFieldError = (field: any, key: string, errors: any = {}) => {
    const [errorMsg] = errors[key] || [];
    field.attrs.error = errorMsg || '';
  };

  private _resetDefaultValue = (field: any) => {
    field.attrs.value = field.attrs.defaultValue || field.attrs.value;
  };
}

const setHelper = new SetHelper();

export default setHelper;
