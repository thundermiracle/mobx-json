import { toJS, observable, action } from 'mobx';

/**
 * ALL functions in this class MUST be pure,
 * functions with SIDE_EFFECT should be moved to _setHelpers.ts
 */
class GetHelper {
  // set settings.type to 'undefined'
  private _MustHaveKeys = ['attrs.name', 'settings.widget'];

  private _CreateIfNotExistKeys = ['attrs.error'];

  // constructor() {
  //   this.initObservableFields = this.initObservableFields.bind(this);
  // }

  /**
   * [Read JSON fields to JsonForm(append to rootFields)]
   * fields -> array; rootFields -> expand position
   *
   * Make fields.attrs observable and copy other property in fields into this.fields
   * Nested fields will also be expanded.
   * @param {array} fieldsDef: definition from Json
   */
  initObservableFields = (fieldsDef: any[], extraMustHaveKeys = []) => {
    if (!fieldsDef) return null;

    const resultFields: any = {};

    fieldsDef.forEach(field => {
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

      // field's contents
      // copy from json
      const settingsFlatten = { ...settings };

      const attrsFlatten = { ...attrs };
      // set value to defaultValue if exist, otherwise set it by settings.type
      if (attrsFlatten.value == null && valueType != null) {
        attrsFlatten.value =
          attrsFlatten.defaultValue || this._getDefaultValueByType(valueType);
      }
      // add error if not defined
      if ((attrsFlatten.error == null && valueType) != null) {
        attrsFlatten.error = '';
      }

      // nested fields
      const fieldsFlatten = childFields
        ? this.initObservableFields(childFields, extraMustHaveKeys)
        : null;

      // contents
      const contents = {
        settings: settingsFlatten,
        attrs: attrsFlatten,
      } as any;
      if (fieldsFlatten != null) {
        contents.fields = fieldsFlatten;
      }

      resultFields[fieldKey] = observable(contents);
    });

    return resultFields;
  };

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

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓Internal Functions↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ //
  /**
   * Do not check if rule was empty
   */
  getAvailableValueRulesKeyLabel = (fields: any) => {
    const pureFields = toJS(fields);
    const allvals = this.getFlattenedValues(pureFields, 'attrs.value');
    const allrules = this.getFlattenedValues(pureFields, 'settings.rule');
    const allnames = this.getFlattenedValues(pureFields, 'attrs.name');

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
  getAvailableValueRulesKeyField = (fields: any) => {
    const pureFields = toJS(fields);
    const allvals = this.getFlattenedValues(pureFields, 'attrs.value');
    const allrules = this.getFlattenedValues(pureFields, 'settings.rule');
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

  private _getDefaultValueByType = (valueType: string) => {
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
}

const getHelper = new GetHelper();

export default getHelper;
