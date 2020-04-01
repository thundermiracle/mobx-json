import { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { TextFieldProps } from '../../TextField';
import { AnyObject } from '../../ComponentTypes';

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
  name: string;
  loaderSize?: number;
  loaderText?: string;
  reloadDelay?: number;
  reloadExcludeRegex?: string;
  items: AutocompleteItem[];
  value?: string;
  valueLabel?: string;
  onChange?: (name: string, value: string, inputValue?: string) => void;
  asyncLoadItems?: (inputValue?: string) => Promise<AutocompleteItem[]>;
  TextFieldComponent: any;
  extraAutocompleteProps?: AnyObject;
  InputPropsClassName?: string;
  inputPropsClassName?: string;
} & AutocompleteProps<TextFieldProps>;
