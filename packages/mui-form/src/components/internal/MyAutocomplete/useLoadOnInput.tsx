import React from 'react';

import { identity } from 'ramda';
import { throttle } from 'throttle-debounce';
import getItemByKeyValue from 'lib/getItemByKeyValue';
import { AutocompleteItem } from './MyAutocompleteTypes';

interface UseLoadOnInputInputProps {
  name: string;
  freeSolo: boolean;
  isSuggestionContainsLabel: boolean;
  reloadDelay?: number;
  reloadExcludeRegex?: string;
  sortedSuggestions: AutocompleteItem[];
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
  freeSolo,
  isSuggestionContainsLabel,
  reloadDelay = 300,
  sortedSuggestions,
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
    (_, newValLabel) => {
      if (newValLabel !== '' && needReload(newValLabel)) {
        reloadItemsThrottle(newValLabel);
      }

      if (!onChange) {
        return;
      }

      if (freeSolo) {
        // value & valueLabel should be same in freeSolo mode, ignore suggestion.value
        onChange(name, newValLabel, newValLabel);
      } else {
        // in Combo box mode, suggestions MUST be selected by click on suggestion
        const newValItem = getItemByKeyValue(
          sortedSuggestions,
          newValLabel,
          isSuggestionContainsLabel ? 'label' : 'value',
        );
        onChange(name, newValItem.value.toString(), newValLabel);
      }
    },
    [
      needReload,
      onChange,
      freeSolo,
      reloadItemsThrottle,
      name,
      sortedSuggestions,
      isSuggestionContainsLabel,
    ],
  );

  return {
    suggestionsLoading,
    filterOptions: identity,
    onInputChange: handleInputChange,
  };
};

export default useLoadOnInput;
