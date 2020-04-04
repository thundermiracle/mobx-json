import React from 'react';

import { identity } from 'ramda';
import { throttle } from 'throttle-debounce';
import { AutocompleteItem } from './MyAutocompleteTypes';

interface UseLoadOnInputInputProps {
  inputValue?: string;
  reloadDelay?: number;
  reloadExcludeRegex?: string;
  setSuggestions: (suggestions: AutocompleteItem[]) => void;
  asyncLoadItems?: (inputValue?: string) => Promise<AutocompleteItem[]>;
  applyChangedValueAndValueLabel: () => void;
}

interface UseLoadOnInputProps {
  suggestionsLoading: boolean;
  filterOptions: (
    options: AutocompleteItem[],
    state: { inputValue: string },
  ) => AutocompleteItem[];
}

const useLoadOnInput = ({
  inputValue = '',
  reloadDelay = 300,
  reloadExcludeRegex,
  asyncLoadItems,
  setSuggestions,
  applyChangedValueAndValueLabel,
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
    (keyword?: string) => {
      if (reloadExcludeRegex == null || keyword == null || keyword === '') {
        return true;
      }

      const regex = new RegExp(reloadExcludeRegex);
      return !regex.test(keyword);
    },
    [reloadExcludeRegex],
  );

  // auto reload asynchronously if value changed
  React.useEffect(() => {
    if (inputValue) {
      if (inputValue !== '' && needReload(inputValue)) {
        reloadItemsThrottle(inputValue);
      }

      /**
       * apply changed value & valueLabel by onChange
       * apply selectedValue to Autocomplete by setState
       */
      applyChangedValueAndValueLabel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return {
    suggestionsLoading,
    filterOptions: identity,
  };
};

export default useLoadOnInput;
