import React from 'react';

import { AutocompleteItem } from './MyAutocompleteTypes';

interface UserLoadOnceInputProps {
  name: string;
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

  return {
    suggestionsLoading,
    onInputChange: handleInputChange,
  };
};

export default useLoadOnce;
