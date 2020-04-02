import React from 'react';

import { filterData, SearchType } from 'filter-data';
import getItemByKeyValue from 'lib/getItemByKeyValue';
import { AutocompleteItem } from './MyAutocompleteTypes';

interface UseLoadOnceInputProps {
  name: string;
  freeSolo: boolean;
  isSuggestionContainsLabel: boolean;
  inputValue?: string;
  sortedSuggestions: AutocompleteItem[];
  setSuggestions: (suggestions: AutocompleteItem[]) => void;
  onChange?: (name: string, inputValue: string, selectedValue?: string) => void;
  forceLoadOnce?: object;
  asyncLoadItems?: (inputValue?: string) => Promise<AutocompleteItem[]>;
}

interface UseLoadOnceProps {
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
  freeSolo,
  isSuggestionContainsLabel,
  inputValue = '',
  onChange,
  sortedSuggestions,
  forceLoadOnce,
  asyncLoadItems,
  setSuggestions,
}: UseLoadOnceInputProps): UseLoadOnceProps => {
  const [suggestionsLoading, setSuggestionsLoading] = React.useState(
    sortedSuggestions.length === 0,
  );

  React.useEffect(() => {
    setSuggestionsLoading(true);
  }, [forceLoadOnce]);

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
  }, [sortedSuggestions]);

  const handleInputChange = React.useCallback(
    (_, newValLabel) => {
      if (!suggestionsLoading && onChange) {
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
          onChange(name, newValLabel, newValItem.value.toString());
        }
      }
    },
    [
      suggestionsLoading,
      onChange,
      freeSolo,
      name,
      sortedSuggestions,
      isSuggestionContainsLabel,
    ],
  );

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
    onInputChange: handleInputChange,
  };
};

export default useLoadOnce;
