interface AnyObject {
  [key: string]: any;
}

interface OnChange {
  (eventOrName: any, value?: any): void;
}

interface Item {
  label?: string;
  value: string | boolean | number;
  group?: string; // for Autocomplete
}

interface Format {
  type: string;
  template?: string;
  items?: Item[];
  itemsSource?: string;
}

enum ValueType {
  number = 'number',
  string = 'string',
  array = 'array',
  container = 'container',
  boolean = 'boolean',
}

interface Settings {
  widget: string;
  valueType: ValueType;
  rule?: string;
  propRule?: string;
  computeRule?: string;
  reloadRule?: string; // trigger asyncLoadItems
  service?: string;
  serviceRouter?: string;
  serviceParamFields?: string[]; // fieldName list; get fields' value as parameters
  format?: Format;
}

type AsyncLoadItemsFunc = (inputValue?: string) => Promise<Item[] | []>;

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
  error?: string;
  reloadOnInput?: boolean; // for Autocomplete ONLY; call asyncLoadItems onInputChange
  forceLoadOnce?: object; // pass new object to trigger asyncLoadItems
  asyncLoadItems?: AsyncLoadItemsFunc;
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
  init?: InitAttrs;
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
  revertToInit: () => void;
}

interface InitAttrs {
  [key: string]: null;
}

interface SinglePropRule {
  prop: [string, any];
  targetFieldName: string;
  targetFieldValue: string;
}

interface SingleComputeRule {
  method: string;
  targetFields: string[];
  extra?: string;
}

interface ValidatorRule {
  name: string;
  callback: any;
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
  ValueType,
  Format,
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
  SingleComputeRule,
  ValidatorRule,
  ValidatorJSManager,
  InitAttrs,
  AsyncLoadItemsFunc,
  Item,
};
