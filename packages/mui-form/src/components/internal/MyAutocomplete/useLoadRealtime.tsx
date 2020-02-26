import React from 'react';

import { identity } from 'ramda';
import { throttle } from 'throttle-debounce';
import { AutocompleteItem } from './MyAutocompleteTypes';

interface UserLoadRealtimeInputProps {
  name: string;
  reloadDelay?: number;
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
  reloadDelay = 300,
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

      if (
        active &&
        // proceed only if result is string or array
        (typeof remoteItems === 'string' || Array.isArray(remoteItems))
      ) {
        setSuggestions(
          Array.isArray(remoteItems) ? remoteItems : [remoteItems],
        );
      }

      setFetching(false);
    },
    [asyncLoadItems, setSuggestions],
  );

  // add throttle to reduce unnecessary requests
  const reloadItemsThrottle = React.useCallback(
    throttle(reloadDelay, reloadItems),
    [],
  );

  const handleInputChange = React.useCallback(
    (_, newVal) => {
      if (newVal !== '') {
        // reloadItems(newVal);
        reloadItemsThrottle(newVal);
      }

      if (onChange) {
        onChange(name, newVal);
      }
    },
    [name, reloadItemsThrottle, onChange],
  );

  return {
    suggestionsLoading,
    filterOptions: identity,
    onInputChange: handleInputChange,
  };
};

export default useLoadRealtime;
