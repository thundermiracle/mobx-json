import React from 'react';

import { filterData, SearchType } from 'filter-data';
import { AutocompleteItem } from './MyAutocompleteTypes';

interface UseLoadOnceInputProps {
  inputValue?: string;
  sortedSuggestions: AutocompleteItem[];
  setSuggestions: (suggestions: AutocompleteItem[]) => void;
  forceLoadOnce?: object;
  asyncLoadItems?: (inputValue?: string) => Promise<AutocompleteItem[]>;
  applyChangedValueAndValueLabel: () => void;
}

interface UseLoadOnceProps {
  suggestionsLoading: boolean;
  filterOptions?: (
    options: AutocompleteItem[],
    state: { inputValue: string },
  ) => AutocompleteItem[];
}

const useLoadOnce = ({
  inputValue = '',
  sortedSuggestions,
  forceLoadOnce,
  asyncLoadItems,
  setSuggestions,
  applyChangedValueAndValueLabel,
}: UseLoadOnceInputProps): UseLoadOnceProps => {
  const [suggestionsLoading, setSuggestionsLoading] = React.useState(
    sortedSuggestions.length === 0,
  );

  React.useEffect(() => {
    setSuggestionsLoading(true);
  }, [forceLoadOnce]);

  // refresh value&valueLabel when inputValue or suggestions changed
  React.useEffect(() => {
    /**
     * apply changed value & valueLabel by onChange
     * apply selectedValue to Autocomplete by setState
     */
    applyChangedValueAndValueLabel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, sortedSuggestions]);

  // reload all suggestions if suggestionsLoading is true
  React.useEffect(() => {
    let active = true;

    // auto load only if it's in loading mode
    if (!suggestionsLoading || !asyncLoadItems) {
      setSuggestionsLoading(false);
      return undefined;
    }

    (async (): Promise<void> => {
      const remoteItems = await asyncLoadItems();

      if (active) {
        setSuggestions(remoteItems);
        setSuggestionsLoading(false);
      }
    })();

    return (): any => {
      active = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestionsLoading]);

  const filterOptions = React.useCallback(
    (options: AutocompleteItem[]) => {
      const result = filterData(options, [
        {
          key: ['value', 'label'],
          value: inputValue,
          type: SearchType.LK,
        },
      ]);

      return result;
    },
    [inputValue],
  );

  return {
    suggestionsLoading,
    filterOptions,
  };
};

export default useLoadOnce;
