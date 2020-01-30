interface AnyObject {
  [key: string]: any;
}

interface OnChange {
  (eventOrName: any, value?: any): void;
}

interface Settings {
  widget: string;
  valueType: string;
  rule?: string;
}

interface Attrs {
  name: string;
  hidden?: boolean;
  value?: any;
  defaultValue?: any;
  [key: string]: any;
}

interface BaseField {
  settings: Settings;
  attrs: Attrs;
  [key: string]: any;
}

type Field = {
  fields?: Fields;
} & BaseField;

interface Fields {
  [key: string]: Field;
}

type JsonField = {
  fields?: JsonField[];
} & BaseField;

interface Blueprint {
  fields: JsonField[];
}

interface JsonForm {
  store?: JsonFormStore;
  fields?: Fields;
  onChange?: Function;
  widgetMap?: AnyObject;
}

interface JsonFormComponent {
  attrs?: Attrs;
  settings?: Settings;
  fields?: Fields;
  onChange?: OnChange;
}

interface JsonFormStore {
  fields: Fields;
  initFieldsByJsonBlueprint: (
    fieldsProp: Blueprint,
    extraMustHaveKeys?: string[],
  ) => void;
  setData: (dataObj: null | undefined | any) => void;
  getData: () => AnyObject;
  onFieldChangeCheckAll: (fieldName: string, value: any) => void;
  onFieldChange: (fieldName: string, value: any) => void;
  checkAllOnSubmit: () => boolean;
  resetAllFields: () => void;
  clearAllErrors: () => void;
}

interface ValidatorRule {
  name: string;
  callback: Function;
  message: string;
}

interface ValidatorJSManager {
  setRules: (rules: ValidatorRule[]) => void;
  setMessages: (
    customMessages: AnyObject,
    locale: string | null | undefined,
  ) => void;
  validate: (value: AnyObject, valueRule: AnyObject) => AnyObject;
}

export {
  AnyObject,
  Settings,
  Attrs,
  Field,
  Fields,
  JsonField,
  Blueprint,
  JsonForm,
  JsonFormComponent,
  JsonFormStore,
  ValidatorRule,
  ValidatorJSManager,
};
