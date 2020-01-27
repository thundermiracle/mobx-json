interface BaseField {
  settings: {
    widget: string;
    valueType: string;
    rule?: string;
  };
  attrs: {
    name: string;
    hidden?: boolean;
    [key: string]: any;
  };
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

export { Field, Fields, JsonField };
