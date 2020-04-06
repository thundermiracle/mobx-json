export interface AutocompleteItem {
  value: string;
  label?: string;
  group?: string;
}

export type MyAutocompleteProps = {
  checkbox?: boolean;
  loading?: boolean;
  reloadOnInput?: boolean;
  forceLoadOnce?: object; // set to {} which is a new object to force reloading
  loaderText?: string;
  reloadDelay?: number;
  reloadExcludeRegex?: string;
  items: AutocompleteItem[];
  value?: string;
  valueLabel?: string;
  onChange?: (name: string, value: string, inputValue?: string) => void;
  asyncLoadItems?: (inputValue?: string) => Promise<AutocompleteItem[]>;
  TextFieldComponent: any;
  extraAutocompleteProps?: object;
  freeSolo?: boolean;
  autoSelect?: boolean;
  autoComplete?: boolean;
  openOnFocus?: boolean;
  // following props are for TextField
  name: string;
  loaderSize?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  InputPropsClassName?: string;
  inputPropsClassName?: string;
  label?: string;
  IconComponent?: any;
  helperText?: string;
};
