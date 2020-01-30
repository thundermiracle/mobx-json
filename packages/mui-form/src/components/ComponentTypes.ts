import { ChangeEvent } from 'react';

interface Format {
  type: string;
  template?: string;
}

interface Item {
  label?: string;
  value: string | boolean | number;
}

interface NativeOnChange {
  (event: ChangeEvent<HTMLElement>): void;
}

interface SystemOnChange {
  (name: string, value?: any): void;
}

type OnChange = NativeOnChange & SystemOnChange;

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
  onChange?: OnChange;
  [key: string]: any;
}

export { FieldProps, Item, OnChange };