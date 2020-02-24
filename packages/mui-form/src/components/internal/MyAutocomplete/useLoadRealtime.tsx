import React from 'react';

import { identity } from 'ramda';
import { AutocompleteItem } from './MyAutocompleteTypes';

interface UserLoadRealtimeInputProps {
  name: string;
  setSuggestions: (suggestions: AutocompleteItem[]) => void;
  onChange?: (name: string, value: string, inputValue?: string) => void;
  asyncLoadItems?: (inputValue?: string) => Promise<AutocompleteItem[]>;
}

interface UserLoadRealtimeProps {
  suggestionsLoading: boolean;
  filterOptions: (
    options: AutocompleteItem[],
    state: { inputValue: string },
  ) => AutocompleteItem[];
  onInputChange: (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: 'input' | 'reset' | 'clear',
  ) => void;
}

const useLoadRealtime = ({
  name,
  onChange,
  asyncLoadItems,
  setSuggestions,
}: UserLoadRealtimeInputProps): UserLoadRealtimeProps => {
  const [fetching, setFetching] = React.useState<boolean>(false);

  const suggestionsLoading = fetching;

  const reloadItems = React.useCallback(
    async (keyword?: string, active = true): Promise<void> => {
      if (!asyncLoadItems) {
        return;
      }

      setFetching(true);
      const remoteItems = await asyncLoadItems(keyword);

      if (active) {
        setSuggestions(
          Array.isArray(remoteItems) ? remoteItems : [remoteItems],
        );
      }

      setFetching(false);
    },
    [asyncLoadItems, setSuggestions],
  );

  const handleInputChange = React.useCallback(
    (_, newVal) => {
      if (newVal !== '') {
        reloadItems(newVal);
      }

      if (onChange) {
        onChange(name, newVal);
      }
    },
    [name, onChange, reloadItems],
  );

  return {
    suggestionsLoading,
    filterOptions: identity,
    onInputChange: handleInputChange,
  };
};

export default useLoadRealtime;
