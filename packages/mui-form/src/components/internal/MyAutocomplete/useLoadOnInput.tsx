import React from 'react';

import { identity } from 'ramda';
import { throttle } from 'throttle-debounce';
import { AutocompleteItem } from './MyAutocompleteTypes';

interface UseLoadOnInputInputProps {
  name: string;
  reloadDelay?: number;
  reloadExcludeRegex?: string;
  setSuggestions: (suggestions: AutocompleteItem[]) => void;
  onChange?: (name: string, value: string, inputValue?: string) => void;
  asyncLoadItems?: (inputValue?: string) => Promise<AutocompleteItem[]>;
}

interface UseLoadOnInputProps {
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

const useLoadOnInput = ({
  name,
  reloadDelay = 300,
  reloadExcludeRegex,
  onChange,
  asyncLoadItems,
  setSuggestions,
}: UseLoadOnInputInputProps): UseLoadOnInputProps => {
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

  const needReload = React.useCallback(
    (inputValue?: string) => {
      if (
        reloadExcludeRegex == null ||
        inputValue == null ||
        inputValue === ''
      ) {
        return true;
      }

      const regex = new RegExp(reloadExcludeRegex);
      return !regex.test(inputValue);
    },
    [reloadExcludeRegex],
  );

  const handleInputChange = React.useCallback(
    (_, newVal) => {
      if (newVal !== '' && needReload(newVal)) {
        reloadItemsThrottle(newVal);
      }

      if (onChange) {
        onChange(name, newVal);
      }
    },
    [needReload, onChange, reloadItemsThrottle, name],
  );

  return {
    suggestionsLoading,
    filterOptions: identity,
    onInputChange: handleInputChange,
  };
};

export default useLoadOnInput;
