interface Format {
  type: string;
  template?: string;
}

interface Item {
  label?: string;
  value: string | boolean | number;
}

interface FieldProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  keepLabelSpace?: boolean;
  className?: string;
  disabled?: boolean;
  format?: Format;
  items?: Item[];
  [key: string]: any;
}

export { FieldProps, Item };
