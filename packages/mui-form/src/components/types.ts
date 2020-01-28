interface Format {
  type: string;
  template?: string;
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
  [key: string]: any;
}

interface Item {
  label?: string;
  value: string | boolean | number;
}

export { FieldProps, Item };
