import { TextFieldProps } from '../../TextField';

export interface AutocompleteItem {
  value: string;
  label?: string;
  group?: string;
}

export type MyAutocompleteProps = {
  freeSolo?: boolean;
  name: string;
  loading?: boolean;
  items: AutocompleteItem[];
  value?: string;
  onChange?: (name: string, value: string, inputValue?: string) => void;
  asyncLoadItems?: () => Promise<AutocompleteItem[]>;
  TextFieldComponent: any;
} & TextFieldProps;
