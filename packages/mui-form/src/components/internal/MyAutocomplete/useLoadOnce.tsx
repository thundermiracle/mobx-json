import React from 'react';

import { filterData, SearchType } from 'filter-data';
import { AutocompleteItem } from './MyAutocompleteTypes';

interface UserLoadOnceInputProps {
  name: string;
  inputValue?: string;
  sortedSuggestions: AutocompleteItem[];
  setSuggestions: (suggestions: AutocompleteItem[]) => void;
  onChange?: (name: string, value: string, inputValue?: string) => void;
  asyncLoadItems?: (inputValue?: string) => Promise<AutocompleteItem[]>;
}

interface UserLoadOnceProps {
  suggestionsLoading: boolean;
  filterOptions?: (
    options: AutocompleteItem[],
    state: { inputValue: string },
  ) => AutocompleteItem[];
  onInputChange: (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: 'input' | 'reset' | 'clear',
  ) => void;
}

const useLoadOnce = ({
  name,
  inputValue = '',
  onChange,
  sortedSuggestions,
  asyncLoadItems,
  setSuggestions,
}: UserLoadOnceInputProps): UserLoadOnceProps => {
  const suggestionsLoading = sortedSuggestions.length === 0;

  React.useEffect(() => {
    let active = true;

    // auto load only if it's in loading mode
    if (!suggestionsLoading || !asyncLoadItems) {
      return undefined;
    }

    (async (): Promise<void> => {
      const remoteItems = await asyncLoadItems();

      if (active) {
        setSuggestions(remoteItems);
      }
    })();

    return (): any => {
      active = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = React.useCallback(
    (_, newVal) => {
      if (!suggestionsLoading && onChange) {
        onChange(name, newVal);
      }
    },
    [suggestionsLoading, name, onChange],
  );

  const filterOptions = React.useCallback(
    (options: AutocompleteItem[]) => {
      const result = filterData(options as any, [
        {
          key: 'value',
          value: inputValue,
          type: SearchType.LK,
        },
      ]);

      return result;
    },
    [inputValue],
  ) as any;

  return {
    suggestionsLoading,
    filterOptions,
    onInputChange: handleInputChange,
  };
};

export default useLoadOnce;
