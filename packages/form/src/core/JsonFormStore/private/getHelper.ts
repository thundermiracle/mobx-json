import { toJS, observable, isObservableObject } from 'mobx';
import { trim } from 'ramda';

import {
  Fields,
  JsonField,
  Field,
  Settings,
  AnyObject,
  SinglePropRule,
  Attrs,
  InitAttrs,
} from '../../JsonFormTypes';

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
    itemsSource: AnyObject,
    iconsMap: AnyObject,
    parentInitAttrs: InitAttrs = {},
  ): Fields => {
    if (!fieldsJson) {
      throw new Error('[JSON file error] JSON file is not defined.');
    }

    const resultFields: Fields = {};

    fieldsJson.forEach(field => {
      const { attrs, settings, fields: childFields, ...restProperties } = field;

      // MUST have attrs and settings
      const errMsg = this._checkParams(field, this._MustHaveKeys);
      if (errMsg.trim().length > 0) {
        throw new Error(`[JSON file error] ${errMsg}`);
      }

      /* BEGIN expanding */
      const fieldKey = attrs.name;
      const valueType = settings.valueType || this._defaultValueType;

      // field's contents
      // copy from json
      const settingsFlatten = { ...settings };

      let attrsFlatten = { ...attrs };
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
      if (attrsFlatten.items == null) {
        if (attrsFlatten.itemsSource) {
          attrsFlatten.items = itemsSource[attrsFlatten.itemsSource] || [];
        }
        Reflect.deleteProperty(attrsFlatten, 'itemsSource');
      }

      // icon -> IconComponent, remove unnecessary icon
      if (attrsFlatten.icon) {
        attrsFlatten.IconComponent = iconsMap[attrsFlatten.icon];

        Reflect.deleteProperty(attrsFlatten, 'icon');
      }

      // init attrs by propRule, make these props observable
      let initAttrs;
      if (settingsFlatten.propRule) {
        initAttrs = this._getInitAttrsByPropRule(settingsFlatten.propRule);
      }
      const allInitAttrs = {
        ...parentInitAttrs,
        ...initAttrs,
      };
      attrsFlatten = {
        ...allInitAttrs,
        ...attrsFlatten,
      };

      // nested fields
      const fieldsFlatten = childFields
        ? this.initObservableFields(
            childFields,
            itemsSource,
            iconsMap,
            allInitAttrs,
          )
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
      // save the init status
      resultFields[fieldKey].init = attrsFlatten;
    });

    return resultFields;
  };

  /**
   * Get field by name from nested-fields
   * @param {object} fields
   * @param {string} fieldName
   */
  getFieldByName = (fields: Fields, fieldName: string): Field | null => {
    if (!fields) return null;

    let field: Field | null = fields[fieldName];

    // Found
    if (field) return field;

    // try to find in SubFields
    Object.values(fields).some(({ fields: subFields }) => {
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
  getFlattenedValues = (
    fieldsMobx: Fields,
    valueKey = 'attrs.value',
  ): AnyObject => {
    let data: AnyObject = {};

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

      if (fields[key].fields != null) {
        // subfields
        const subDataObj = this.getFlattenedValues(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          fields[key].fields!,
          valueKey,
        );
        data = { ...data, ...subDataObj };
      }
    });
    // console.log(fields)
    return data;
  };

  /**
   * Get {value, rule} for validation if rule was not empty
   */
  getAvailableValueRulesKeyLabel = (
    fields: Fields,
  ): { value: object; rule: object } => {
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
   * format value for onChange or submit
   */
  getTypedValue = (value: any, type = 'string'): any => {
    // [], null, undefined, ''
    if (value == null || value.length === 0) {
      return value;
    }

    switch (type) {
      case 'number':
        return +value;
      case 'boolean':
        // eslint-disable-next-line eqeqeq
        return value == 'true';
      case 'string':
        return value.toString();
      default:
        return value;
    }
  };

  /**
   * propRule MUST be 'propName,propValue:targetColName,targetColValue | ...'
   *
   * which means if (targetColName's value === targetColValue),
   * change { propName: propValue } in field.attrs,
   * and  if (targetColName's value !== targetColValue),
   * copy init.{ propName: propValue } in field.attrs
   */
  getExtraPropsByPropRule = (
    propRule: string,
    changedFieldName: string,
    changedFieldValue: any,
    initAttrs: Attrs,
  ): AnyObject => {
    const allPropRules: SinglePropRule[] = this._flattenPropRule(propRule);

    const extraProps = allPropRules.reduce(
      (
        prevExtraProps: AnyObject,
        { prop, targetColName, targetColValue }: SinglePropRule,
      ) => {
        // apply only if targetCol.value == changedValue
        if (targetColName === changedFieldName) {
          const [propKey, propValue] = prop;
          if (targetColValue.toString() === changedFieldValue.toString()) {
            prevExtraProps[propKey] = propValue;
          } else {
            prevExtraProps[propKey] = initAttrs[propKey];
          }
        }

        return prevExtraProps;
      },
      {},
    );

    return extraProps;
  };

  private _isKeyInObj = (key: string, obj: object): boolean => {
    return Object.keys(obj).includes(key);
  };

  /**
   * return '' if defaultValue is null
   * to avoid uncontrolled component -> controlled component warning
   */
  private _purgeDefaultValue = (defaultVal?: any): any => {
    if (defaultVal == null) {
      return '';
    }

    return defaultVal;
  };

  private _isRequired = (settings: Settings): boolean => {
    // required string in rule
    const { rule = '' } = settings;
    const allRules = rule.split('|');

    return allRules.includes('required');
  };

  private _getDefaultValueByType = (
    valueType: string,
  ): number | object | boolean | string | null => {
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
  private _checkParams = (
    paramObj: object,
    mustHaveList: string[] = [],
  ): string => {
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
  private _getValueByNestedKey = (obj: object, nestedKey: string): any => {
    return nestedKey.split('.').reduce((prevObj: any, key) => {
      if (prevObj) {
        return prevObj[key];
      }

      return null;
    }, obj);
  };

  private _flattenPropRule = (propRule: string): SinglePropRule[] => {
    const allPropRules: SinglePropRule[] = propRule.split('|').map(ruleStr => {
      const [propPart, targetPart] = ruleStr.split(':');
      const [propName, propValue, propValueType] = propPart
        .split(',')
        .map(trim);
      const [targetColName, targetColValue] = targetPart.split(',').map(trim);

      return {
        prop: [propName, this.getTypedValue(propValue, propValueType)],
        targetColName,
        targetColValue,
      };
    });

    return allPropRules;
  };

  /**
   * extract extra props from propRule and add to field.attrs
   * in order to make them observable by mobx
   */
  private _getInitAttrsByPropRule = (
    propRule: string,
  ): { [key: string]: null } => {
    const allPropRules = this._flattenPropRule(propRule);

    return allPropRules.reduce(
      (prevObj: AnyObject, { prop }: SinglePropRule) => {
        const [propName] = prop;
        prevObj[propName] = null;
        return prevObj;
      },
      {},
    );
  };
}

const getHelper = new GetHelper();

export default getHelper;
