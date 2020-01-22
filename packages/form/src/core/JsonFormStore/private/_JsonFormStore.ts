import { toJS, observable, action } from 'mobx';

class JsonFormPrivateStore {
  // set settings.type to 'undefined'
  private _MustHaveKeys = ['attrs.name', 'settings.widget'];

  private _CreateIfNotExistKeys = ['attrs.error'];

  // constructor() {
  //   this.initObservableFields = this.initObservableFields.bind(this);
  // }

  /**
   * [Check whether paramObj has all keys in mustHaveList or not]
   * @param {object} paramObj
   * @param {array} mustHaveList
   */
  private _checkParams = (paramObj: object, mustHaveList: string[] = []) => {
    let errMsg = `Keys in Json are not enough: Please check following keys carefully. [${mustHaveList.join(
      '&',
    )}];\n`;
    if (paramObj && typeof paramObj === 'object') {
      const passed = mustHaveList.every(
        propertyPath =>
          this._getValueByNestedKey(paramObj, propertyPath) != null,
      );
      if (passed) {
        errMsg = '';
      }
    }

    return errMsg;
  };

  /**
   * [Read JSON fields to FormMixin(append to rootFields)]
   * fields -> array; rootFields -> expand position
   *
   * Make fields.attrs observable and copy other property in fields into this.fields
   * Nested fields will also be expanded.
   * @param {array} fields
   */
  initObservableFields = (fields: any[], extraMustHaveKeys = []) => {
    if (!fields) return null;

    const resultFields: any = {};

    fields.forEach(field => {
      const { attrs, settings, fields: childFields, ...restProperties } = field;

      // MUST have attrs and settings
      const errMsg = this._checkParams(field, [
        ...this._MustHaveKeys,
        ...extraMustHaveKeys,
      ]);
      if (errMsg.trim().length > 0) {
        throw new Error(`[JSON file error] ${errMsg}`);
      }

      /* BEGIN expanding */
      const fieldKey = attrs.name;
      const valueType = settings.type;

      // Contents
      const contents = {
        settings: { ...settings, ...extraMustHaveKeys },
        ...restProperties,
      };
      contents.attrs = Object.keys(attrs).reduce((prevObj, attrsKey) => {
        this._setDefaultValue(prevObj, attrsKey, attrs[attrsKey]);
        return prevObj;
      }, {});

      // add value if not defined
      if (!contents.attrs.value) {
        this._setDefaultValue(
          contents.attrs,
          'value',
          contents.attrs.defaultValue,
          valueType,
        );
      }

      // add error if not defined
      this._CreateIfNotExistKeys.forEach(nestedKey => {
        if (!this._getValueByNestedKey(contents, nestedKey)) {
          this._setValueByNestedKey(contents, nestedKey);
        }
      });

      // nested fields
      if (childFields) {
        contents.fields = this.initObservableFields(
          childFields,
          extraMustHaveKeys,
        );
      }

      resultFields[fieldKey] = observable(contents);
    });

    return resultFields;
  };

  /* *************************************************************** */
  /* Following methods are operating in nested fields                */
  /* *************************************************************** */
  /**
   * Get field by name from nested-fields
   * @param {string} fieldName
   * @param {object} fields
   */
  getFieldByName = (fieldName: string, fields: any) => {
    if (!fields) return null;

    let field = fields[fieldName];

    // Found
    if (field) return field;

    // try to find in SubFields
    Object.keys(fields).some(oneFieldName => {
      const subFields = fields[oneFieldName].fields;
      if (!subFields) return false;

      field = this.getFieldByName(fieldName, subFields);
      if (field) return true;

      return false;
    });

    return field;
  };

  /**
   * Get values from nested-fields
   * @param {array} fields
   * @param {string} valueKey
   */
  getFlattenedValues = (fields: any, valueKey = 'attrs.value') => {
    let data: any = {};

    Object.keys(fields).forEach(key => {
      const value = this._getValueByNestedKey(fields[key], valueKey);
      const type = fields[key].settings.type;

      if (type != null) {
        data[key] = value;
      }

      if (fields[key].fields) {
        // subfields
        const subDataObj = this.getFlattenedValues(
          fields[key].fields,
          valueKey,
        );
        data = { ...data, ...subDataObj };
      }
    });

    return data;
  };

  /**
   * TODO: SIDE_EFFECT
   */
  setDataToAllFields = (fields: any, dataObj: any) => {
    this._invokeFuncToAllFields(this._setValToField, fields, dataObj);
  };

  private _setValToField = (field: any, key: string, dataObj: any) => {
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

  /**
   * [Add Observable object to targetObj]
   * @param {object} targetObj
   * @param {string} key
   * @param {any} value
   * @param {any} defValue
   */
  private _setDefaultValue = (
    targetObj: any,
    key: string,
    value: any,
    valueType = 'undefined',
  ) => {
    const defValue = this._getDefaultValue(valueType);
    targetObj[key] = value || targetObj[key] || defValue;
  };

  /**
   * get value by Nestedkey
   * exp: attrs.name => field.attrs.name
   */
  private _getValueByNestedKey = (obj: object, nestedKey: string) => {
    return nestedKey.split('.').reduce((prevObj: any, key) => {
      if (prevObj) {
        return prevObj[key];
      }

      return null;
    }, obj);
  };

  /**
   * set value by NestedKey
   * exp: attrs.name => field.attrs.name
   */
  private _setValueByNestedKey = (
    obj: any,
    nestedKey: string,
    value = null,
  ) => {
    let schema = obj;
    const pList = nestedKey.split('.');
    const len = pList.length;
    for (let iLoop = 0; iLoop < len - 1; iLoop += 1) {
      const elem = pList[iLoop];
      if (!schema[elem]) schema[elem] = {};
      schema = schema[elem];
    }

    schema[pList[len - 1]] = value;
  };

  private _getDefaultValue = (valueType: string) => {
    switch (valueType) {
      case 'number':
        return 0;
      case 'object':
        return {};
      case 'boolean':
        return false;
      case 'string':
        return '';
      case 'undefined':
      default:
        return null;
    }
  };
}

export default JsonFormPrivateStore;
