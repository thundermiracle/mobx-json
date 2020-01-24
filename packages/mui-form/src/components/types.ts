interface FieldProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  keepLabelSpace?: boolean;
  className?: string;
  [key: string]: any;
}

interface Item {
  label?: string;
  value: string | boolean | number;
}

export { FieldProps, Item };
