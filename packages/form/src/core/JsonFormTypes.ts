interface AnyObject {
  [key: string]: any;
}

interface Settings {
  widget: string;
  valueType: string;
  rule?: string;
}

interface Attrs {
  name: string;
  hidden?: boolean;
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

interface JsonForm {
  store?: any;
  fields?: any;
  onChange?: Function;
  widgetMap?: any;
}

interface JsonFormComponent {
  attrs?: any;
  settings?: any;
  fields?: object;
  onChange?: Function;
}

export {
  AnyObject,
  Settings,
  Attrs,
  Field,
  Fields,
  JsonField,
  JsonForm,
  JsonFormComponent,
};
