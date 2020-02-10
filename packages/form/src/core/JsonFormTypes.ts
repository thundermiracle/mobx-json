interface AnyObject {
  [key: string]: any;
}

interface OnChange {
  (eventOrName: any, value?: any): void;
}

interface Item {
  label?: string;
  value: string | boolean | number;
}

interface Settings {
  widget: string;
  valueType: string;
  rule?: string;
  propRule?: string;
}

interface Attrs {
  name: string;
  hidden?: boolean;
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  itemsSource?: string;
  items?: Item[];
  icon?: string;
  grid?: AnyObject;
  extraProps?: AnyObject;
  [key: string]: any;
}

interface BaseField {
  settings: Settings;
  attrs: Attrs;
  init: Attrs;
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
  initFieldsByJsonBlueprint: (fieldsProp: Blueprint) => void;
  setData: (dataObj: null | undefined | any) => void;
  getData: () => AnyObject;
  getErrors: () => AnyObject;
  getFirstErrFieldName: () => string | undefined;
  onFieldChange: (fieldName: string, value: any) => void;
  checkAllOnSubmit: () => boolean;
  resetAllFields: () => void;
  clearAllErrors: () => void;
}

interface InitAttrs {
  [key: string]: null;
}

interface SinglePropRule {
  prop: [string, any];
  targetColName: string;
  targetColValue: string;
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
  SinglePropRule,
  ValidatorRule,
  ValidatorJSManager,
  InitAttrs,
};
