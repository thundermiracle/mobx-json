import { toJS, observable } from 'mobx';

class JsonFormPrivateStore {
  // set settings.type to 'undefined'
  _MustHaveKeys = ['attrs.name', 'settings.widget'];

  _CreateIfNotExistKeys = ['attrs.error'];

  /**
   * Save all fields' references, for quicker search
   */
  _FLATTEN_FIELDS = {};

  /**
   * [Check whether paramObj has all keys in mustHaveList or not]
   * @param {object} paramObj
   * @param {array} mustHaveList
   */
  _checkParams = (paramObj, mustHaveList = []) => {
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
  initObservableFields = (fields, extraMustHaveKeys = []) => {
    if (!fields) return null;

    const resultFields = {};

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
      const valueType = settings.type || 'string';

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
      this._FLATTEN_FIELDS[fieldKey] = resultFields[fieldKey];
    });

    return resultFields;
  };

  /**
   * Get all fields' references
   */
  getFlattenAllFieldsReferences() {
    return this._FLATTEN_FIELDS;
  }

  /**
   * Get field from ReferenceFields
   * @param {string} fieldName
   */
  getFieldByName(fieldName, paraFields = this._FLATTEN_FIELDS) {
    return paraFields[fieldName];
  }

  /**
   * Get values from ReferenceFields
   * @param {array} fields
   * @param {string} valueKey
   */
  getFlattenedValues = (
    valueKey = 'attrs.value',
    paraFields = this._FLATTEN_FIELDS,
  ) => {
    const fields = toJS(paraFields);
    return Object.keys(fields).reduce((prevObj, key) => {
      prevObj[key] = this._getValueByNestedKey(fields[key], valueKey);
      return prevObj;
    }, {});
  };

  /**
   * reset all fields
   * @param {*} fields
   */
  resetAllFields = (paraFields = this._FLATTEN_FIELDS) => {
    Object.keys(paraFields).forEach(key => {
      const field = paraFields[key];
      // clear errors
      this._setFieldError(field, key);
      // set default values
      this._resetDefaultValue(field);
    });
  };

  /**
   * set errors to all fields
   * @param {*} fields
   * @param {*} errors
   */
  setAllFieldsErrors = (errors, paraFields = this._FLATTEN_FIELDS) => {
    Object.keys(paraFields).forEach(key => {
      const field = paraFields[key];
      this._setFieldError(field, key, errors);
    });
  };

  /* *************************************************************** */
  /* Following methods are operating in nested fields                */
  /* *************************************************************** */
  /**
   * Get field by name from nested-fields
   * @param {array} fields
   * @param {string} fieldName
   */
  getFieldByNameNested = (fieldName, fields) => {
    if (!fields) return null;

    let field = fields[fieldName];

    // Found
    if (field) return field;

    // try to find in SubFields
    Object.keys(fields).some(oneFieldName => {
      const subFields = fields[oneFieldName].fields;
      if (!subFields) return false;

      field = this.getFieldByNameNested(fieldName, subFields);
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
  getFlattenedValuesNested = (valueKey = 'attrs.value', fields) => {
    let data = {};

    Object.keys(fields).forEach(key => {
      const value = this._getValueByNestedKey(fields[key], valueKey);
      data[key] = value;

      if (fields[key].fields) {
        // subfields
        const subDataObj = this.getFlattenedValuesNested(
          valueKey,
          fields[key].fields,
        );
        data = { ...data, ...subDataObj };
      }
    });

    return data;
  };

  /**
   * Operation for all nested fields
   * @param {*} func
   * @param {*} fields
   * @param {*} funcArg
   */
  invokeSetFuncToAllField = (func, fields, ...funcArg) => {
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (field.fields) {
        this.invokeSetFuncToAllField(func, field.fields, ...funcArg);
      } else {
        func(field, key, ...funcArg);
      }
    });
  };

  /**
   * reset all fields
   * @param {*} fields
   */
  resetAllFieldsNested = fields => {
    // const newFields = toJS(fields);
    const newFields = fields;

    // clear errors
    this.invokeSetFuncToAllField(this._setFieldError, newFields);

    // set default values
    this.invokeSetFuncToAllField(this._resetDefaultValue, newFields);

    // return observable(newFields);
  };

  /**
   * set errors to all fields
   * @param {*} fields
   * @param {*} errors
   */
  setAllFieldsErrorsNested = (errors, fields) => {
    // const newFields = toJS(fields);
    const newFields = fields;

    this.invokeSetFuncToAllField(this._setFieldError, newFields, errors);

    // return observable(newFields);
  };
  /* *************************************************************** */
  /* End of nested fields methods                                    */
  /* *************************************************************** */

  _setFieldError = (field, key, errors) => {
    const errorMsg = errors ? errors.first(key) : null;
    field.attrs.error = errorMsg === false ? null : errorMsg;
  };

  _resetDefaultValue = field => {
    field.attrs.value = field.attrs.defaultValue || field.attrs.value;
  };

  /**
   * [Add Observable object to targetObj]
   * @param {object} targetObj
   * @param {string} key
   * @param {any} value
   * @param {any} defValue
   */
  _setDefaultValue = (targetObj, key, value, valueType = 'undefined') => {
    const defValue = this._getDefaultValue(valueType);
    targetObj[key] = value || targetObj[key] || defValue;
  };

  /**
   * get value by Nestedkey
   * exp: attrs.name => field.attrs.name
   */
  _getValueByNestedKey = (obj, nestedKey) => {
    return nestedKey.split('.').reduce((prevObj, key) => {
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
  _setValueByNestedKey = (obj, nestedKey, value = null) => {
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

  _getDefaultValue = valueType => {
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
