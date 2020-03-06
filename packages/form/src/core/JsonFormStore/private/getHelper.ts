import { toJS, observable, isObservableObject } from 'mobx';
import { trim, pick, curry } from 'ramda';

import makeSingle from 'lib/makeSingle';
import { isNotNil } from 'lib/utils';
import {
  Fields,
  JsonField,
  Field,
  AnyObject,
  SinglePropRule,
  Attrs,
  InitAttrs,
  SingleComputeRule,
  ValueType,
  AsyncLoadItemsFunc,
} from '../../JsonFormTypes';

/**
 * ALL functions in this class MUST be pure,
 * functions with SIDE_EFFECT should be moved to _setHelpers.ts
 */
class GetHelper {
  // set settings.valueType to 'undefined'
  private _MustHaveKeys = ['attrs.name', 'settings.widget'];

  private _CreateIfNotExistKeys = ['attrs.error'];

  private _PropagableAttrs = ['disabled', 'hidden', 'required'];

  private _defaultValueType = ValueType.string;

  private _containerValueType = ValueType.container;

  private _asyncLoadItemsFuncCache: { [key: string]: AsyncLoadItemsFunc } = {};

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
    serviceContainer: AnyObject,
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
        this._isRequired(settingsFlatten.rule) || attrsFlatten.required;

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

      // set items=[] if service is defined to make component controlled
      if (settingsFlatten.service) {
        attrsFlatten.items = [];
        attrsFlatten.asyncLoadItems = this._makeAsyncLoadItems(
          attrsFlatten.name,
          serviceContainer,
          settingsFlatten.service,
          settingsFlatten.serviceRouter,
          settingsFlatten.serviceParamFields,
        );
      }

      // nested fields
      let fieldsFlatten;
      if (childFields) {
        // propagate disabled, hidden... to children
        const propagateAttrs = this._getPropagableAttrs(attrsFlatten);

        fieldsFlatten = this.initObservableFields(
          childFields,
          itemsSource,
          iconsMap,
          serviceContainer,
          { ...allInitAttrs, ...propagateAttrs },
        );
      }

      // contents
      const contents: Field = {
        init: attrsFlatten, // save the init status
        settings: settingsFlatten,
        attrs: observable(attrsFlatten),
        ...restProperties,
      };
      if (fieldsFlatten != null) {
        contents.fields = fieldsFlatten;
      }

      resultFields[fieldKey] = contents;
    });

    // initialize _getTargetFieldsValPartial
    this._getTargetFieldsValPartial = curry(this.getTargetFieldsVal)(
      resultFields,
    );

    return resultFields;
  };

  /**
   * Get field by name from nested-fields
   * @param {object} fields
   * @param {string} fieldName
   */
  getFieldByName = (fields: Fields | null, fieldName: string): Field | null => {
    if (!fields) return null;

    let field: Field | null = fields[fieldName] || null;

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
   * @param {string} valueKey: 'attrs.value'
   * @param {boolean} withContainer: false
   */
  flattenProps = (
    fieldsMobx: Fields,
    valueKey = 'attrs.value',
    withContainer = false,
  ): AnyObject => {
    let data: AnyObject = {};

    // purify fields if it's Mobx Observable object
    const fields = isObservableObject(fieldsMobx)
      ? toJS(fieldsMobx)
      : fieldsMobx;

    Object.keys(fields).forEach(key => {
      const value = this._getValueByNestedKey(fields[key], valueKey);
      const valueType = fields[key].settings.valueType;

      if (withContainer || valueType !== this._containerValueType) {
        // convert value if valueKey is attrs.value
        if (valueKey === 'attrs.value') {
          data[key] = this.getTypedValue(value, valueType);
        } else {
          data[key] = value;
        }
      }

      if (fields[key].fields != null) {
        // sub fields
        const subDataObj = this.flattenProps(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          fields[key].fields!,
          valueKey,
        );
        data = { ...data, ...subDataObj };
      }
    });
    return data;
  };

  /**
   * Get {value, rule} for validation if rule was not empty
   */
  getAvailableValueRulesKeyLabel = (
    fields: Fields,
  ): { value: object; rule: object } => {
    const pureFields = this.getVisibleFields(fields);

    const allvals = this.flattenProps(pureFields, 'attrs.value');
    const allrules = this.flattenProps(pureFields, 'settings.rule');
    const allnames = this.flattenProps(pureFields, 'attrs.name');
    const allvaltypes = this.flattenProps(pureFields, 'settings.valueType');

    const vals: any = {};
    const rules: any = {};

    Object.keys(allvals).forEach(key => {
      if (allrules[key] != null && allrules[key] !== '') {
        vals[allnames[key]] = this.getValForCheck(
          allvals[key],
          allvaltypes[key],
        );
        rules[allnames[key]] = allrules[key];
      }
    });

    return { value: vals, rule: rules };
  };

  /**
   * get fields which attrs.hidden != true
   */
  getVisibleFields = (inputFields: Fields): Fields => {
    const fields = toJS(inputFields);

    return Object.keys(fields).reduce((prevFields, fieldName: string) => {
      if (!fields[fieldName].attrs.hidden) {
        const subFields = fields[fieldName].fields;
        if (subFields != null) {
          // pure children fields
          fields[fieldName].fields = this.getVisibleFields(subFields);
        }

        prevFields[fieldName] = fields[fieldName];
      }

      return prevFields;
    }, {} as Fields);
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
        return value.toString() === 'true';
      case 'string':
        return value.toString();
      default:
        return value;
    }
  };

  /**
   * propRule MUST be 'propName,propValue:targetFieldName,targetFieldValue | ...'
   *
   * which means if (targetFieldName's value === targetFieldValue),
   * change { propName: propValue } in field.attrs,
   * and  if (targetFieldName's value !== targetFieldValue),
   * copy init.{ propName: propValue } in field.attrs
   */
  getExtraPropsByPropRule = (
    propRule: string,
    changedFieldName: string,
    changedFieldValue: any,
    initAttrs: Attrs,
  ): AnyObject => {
    const allPropRules: SinglePropRule[] = this.flattenPropRule(propRule);

    const extraProps = allPropRules.reduce(
      (
        prevExtraProps: AnyObject,
        { prop, targetFieldName, targetFieldValue }: SinglePropRule,
      ) => {
        // apply only if targetField.value == changedValue
        if (targetFieldName === changedFieldName) {
          const [propKey, propValue] = prop;
          if (targetFieldValue.toString() === changedFieldValue.toString()) {
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

  flattenPropRule = (propRule: string): SinglePropRule[] => {
    const allPropRules: SinglePropRule[] = propRule.split('|').map(ruleStr => {
      const [propPart, targetPart] = ruleStr.split(':');
      const [propName, propValue, propValueType] = propPart
        .split(',')
        .map(trim);
      const [targetFieldName, targetFieldValue] = targetPart
        .split(',')
        .map(trim);

      return {
        prop: [propName, this.getTypedValue(propValue, propValueType)],
        targetFieldName,
        targetFieldValue,
      };
    });

    return allPropRules;
  };

  flattenComputeRule = (computeRule: string): SingleComputeRule[] => {
    const result: SingleComputeRule[] = computeRule.split('|').map(ruleStr => {
      const [method, targetFieldStr, extra] = ruleStr.split(':');
      const targetFields = targetFieldStr.split(',').map(trim);

      return {
        method,
        targetFields,
        extra,
      } as SingleComputeRule;
    });

    return result;
  };

  getTargetFieldsVal = (fields: Fields, targetFields: string[]): AnyObject => {
    const allFieldsVal = this.flattenProps(fields);

    return pick(targetFields, allFieldsVal);
  };

  /**
   * valueType=boolean&value=false returns ''
   */
  getValForCheck = (value: any, valueType = ValueType.string): any => {
    // convert false to '' if valueType is boolean to trigger 'required' rule check
    if (valueType === ValueType.boolean && value === false) {
      return '';
    }

    return value;
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

  private _isRequired = (rule = ''): boolean => {
    // required string in rule
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
   * get value by nested key
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

  /**
   * extract extra props from propRule and add to field.attrs
   * in order to make them observable by mobx
   */
  private _getInitAttrsByPropRule = (
    propRule: string,
  ): { [key: string]: null } => {
    const allPropRules = this.flattenPropRule(propRule);

    return allPropRules.reduce(
      (prevObj: AnyObject, { prop }: SinglePropRule) => {
        const [propName] = prop;
        prevObj[propName] = null;
        return prevObj;
      },
      {},
    );
  };

  private _getPropagableAttrs = (attrsFlatten: Attrs): AnyObject => {
    const result = pick(this._PropagableAttrs, attrsFlatten);

    return result;
  };

  /**
   * return asyncLoadItems function
   *
   * @param serviceContainer
   * @param service
   * @param serviceRouter
   */
  private _makeAsyncLoadItems = (
    name: string,
    serviceContainer: AnyObject,
    service: string,
    serviceRouter = 'get',
    serviceParamFieldNames: string[] = [],
  ): AsyncLoadItemsFunc => {
    const cacheKey = `${service}${serviceRouter}`;
    const cacheFunc = this._asyncLoadItemsFuncCache[cacheKey];
    if (cacheFunc) {
      return cacheFunc;
    }

    const serviceInstance = serviceContainer[service];

    // TODO: check Blueprint before flatten it
    if (serviceInstance == null) {
      throw new Error(
        `service [${service}] is not exist in serviceContainer. Add your service to plugins.serviceContainer.`,
      );
    }
    if (serviceInstance[serviceRouter] == null) {
      throw new Error(
        `function [${serviceRouter}] is not in service [${service}]`,
      );
    }

    const serviceFunc = serviceInstance[serviceRouter];
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    function* _asyncLoadItemsGenerator(inputValue?: string): Generator<any> {
      // _getTargetFieldsValPartial has been initialized in initObservableFields & CANNOT be undefined
      const params = self._getTargetFieldsValPartial!(serviceParamFieldNames);

      const result = yield serviceFunc({ name, inputValue, params });

      return result;
    }

    // return Symbol('takeover') if new asyncLoadItems call is cancelled
    const asyncLoadItems = makeSingle(_asyncLoadItemsGenerator);

    this._asyncLoadItemsFuncCache[cacheKey] = asyncLoadItems;

    return asyncLoadItems;
  };

  /**
   * !!initialized in this.initObservableFields!!
   * !MUST be called after this.initObservableFields being initialized!
   */
  private _getTargetFieldsValPartial:
    | ((serviceParamFields: string[]) => AnyObject)
    | undefined;
}

const getHelper = new GetHelper();

export default getHelper;
