import { toJS, observable, action, isObservableObject } from 'mobx';
import { Fields, JsonField } from '../types';

/**
 * ALL functions in this class MUST be pure,
 * functions with SIDE_EFFECT should be moved to _setHelpers.ts
 */
class GetHelper {
  // set settings.valueType to 'undefined'
  private _MustHaveKeys = ['attrs.name', 'settings.widget'];

  private _CreateIfNotExistKeys = ['attrs.error'];

  private _defaultValueType = 'string';

  private _containerValueType = 'container';

  // constructor() {
  //   this.initObservableFields = this.initObservableFields.bind(this);
  // }

  /**
   * [Read JSON fields to JsonForm(append to rootFields)]
   * fields -> array; rootFields -> expand position
   *
   * Make fields.attrs observable and copy other property in fields into this.fields
   * Nested fields will also be expanded.
   * @param {array} fieldsJson: definition from Json
   */
  initObservableFields = (
    fieldsJson: JsonField[],
    itemsSource: any,
    extraMustHaveKeys = [],
  ): Fields => {
    if (!fieldsJson) {
      throw new Error('[JSON file error] JSON file is not defined.');
    }

    const resultFields: any = {};

    fieldsJson.forEach(field => {
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
      const valueType = settings.valueType || this._defaultValueType;

      // field's contents
      // copy from json
      const settingsFlatten = { ...settings };

      const attrsFlatten = { ...attrs };
      // set value to defaultValue if exist, otherwise set it by settings.valueType
      if (
        attrsFlatten.value == null &&
        valueType !== this._containerValueType
      ) {
        attrsFlatten.value = this._isKeyInObj('defaultValue', attrsFlatten)
          ? this._purgeDefaultValue(attrsFlatten.defaultValue)
          : this._getDefaultValueByType(valueType);
      }
      // add error if not defined
      if (
        (attrsFlatten.error == null && valueType) !== this._containerValueType
      ) {
        attrsFlatten.error = '';
      }
      // required property
      attrsFlatten.required =
        this._isRequired(settingsFlatten) || attrsFlatten.required;

      // itemsSource -> items, remove unnecessary items
      if (attrsFlatten.itemsSource) {
        attrsFlatten.items = itemsSource[attrsFlatten.itemsSource] || [];
        Reflect.deleteProperty(attrsFlatten, 'itemsSource');
      }

      // nested fields
      const fieldsFlatten = childFields
        ? this.initObservableFields(childFields, extraMustHaveKeys)
        : null;

      // contents
      const contents: any = {
        settings: settingsFlatten,
        attrs: attrsFlatten,
        ...restProperties,
      };
      if (fieldsFlatten != null) {
        contents.fields = fieldsFlatten;
      }

      resultFields[fieldKey] = observable(contents);
    });

    return resultFields;
  };

  /**
   * Get field by name from nested-fields
   * @param {object} fields
   * @param {string} fieldName
   */
  getFieldByName = (fields: any, fieldName: string) => {
    if (!fields) return null;

    let field = fields[fieldName];

    // Found
    if (field) return field;

    // try to find in SubFields
    Object.keys(fields).some(oneFieldName => {
      const subFields = fields[oneFieldName].fields;
      if (!subFields) return false;

      field = this.getFieldByName(subFields, fieldName);
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
  getFlattenedValues = (fieldsMobx: any, valueKey = 'attrs.value') => {
    let data: any = {};

    // purify fields if it's Mobx Observable object
    const fields = isObservableObject(fieldsMobx)
      ? toJS(fieldsMobx)
      : fieldsMobx;

    Object.keys(fields).forEach(key => {
      const value = this._getValueByNestedKey(fields[key], valueKey);
      const valueType = fields[key].settings.valueType;

      if (valueType !== this._containerValueType) {
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
    // console.log(fields)
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

  /**
   * format value for onChange or submit
   */
  getTypedValue = (value: any, type = 'string') => {
    // [], null, undefined, ''
    if (value == null || value.length === 0) {
      return value;
    }

    switch (type) {
      case 'number':
        return +value;
      case 'boolean':
        // eslint-disable-next-line eqeqeq
        return value == true;
      case 'string':
        return value.toString();
      default:
        return value;
    }
  };

  private _isKeyInObj = (key: string, obj: object) => {
    return Object.keys(obj).includes(key);
  };

  /**
   * return '' if defaultValue is null
   * to avoid uncontrolled component -> controlled component warning
   */
  private _purgeDefaultValue = (defaultVal?: any) => {
    if (defaultVal === null) {
      return '';
    }

    return defaultVal;
  };

  private _isRequired = (settings: any) => {
    // required string in rule
    const { rule = '' } = settings;
    const allRules = rule.split('|');

    return allRules.includes('required');
  };

  private _getDefaultValueByType = (valueType: string) => {
    switch (valueType) {
      case 'number':
        return 0;
      case 'object':
        return {};
      case 'array':
        return [];
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
