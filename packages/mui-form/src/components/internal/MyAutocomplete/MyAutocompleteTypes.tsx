import { TextFieldProps } from '../../TextField';
import { AnyObject } from '../../ComponentTypes';

export interface AutocompleteItem {
  value: string;
  label?: string;
  group?: string;
}

export type MyAutocompleteProps = {
  freeSolo?: boolean;
  name: string;
  loading?: boolean;
  loaderSize?: number;
  loaderText?: string;
  reloadDelay?: number;
  reloadOnInput?: boolean;
  reloadExcludeRegex?: string;
  items: AutocompleteItem[];
  value?: string;
  onChange?: (name: string, value: string, inputValue?: string) => void;
  asyncLoadItems?: (inputValue?: string) => Promise<AutocompleteItem[]>;
  TextFieldComponent: any;
  autoHighlight?: boolean;
  autoComplete?: boolean;
  autoSelect?: boolean;
  extraAutocompleteProps?: AnyObject;
  InputPropsClassName?: string;
  inputPropsClassName?: string;
} & TextFieldProps;
