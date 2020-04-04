import React, { ChangeEvent } from 'react';

import getItemByKeyValue from 'lib/getItemByKeyValue';
import { AutocompleteItem } from './MyAutocompleteTypes';

interface UseCommonFuncsInputProps {
  name: string;
  freeSolo: boolean;
  isSuggestionContainsLabel: boolean;
  inputValue?: string;
  sortedSuggestions: AutocompleteItem[];
  onChange?: (name: string, inputValue: string, selectedValue?: string) => void;
}

interface UseCommonFuncsProps {
  applyChangedValueAndValueLabel: () => void;
  handleOnInputChange: (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: 'input' | 'reset' | 'clear',
  ) => void;
  selectedSuggestion: AutocompleteItem | null;
  handleOnChange: (
    e: ChangeEvent<{}>,
    suggestion: AutocompleteItem | null,
  ) => void;
}

const useCommonFuncs = ({
  name,
  onChange,
  freeSolo,
  inputValue = '',
  sortedSuggestions,
  isSuggestionContainsLabel,
}: UseCommonFuncsInputProps): UseCommonFuncsProps => {
  const [
    selectedSuggestion,
    setSelectedSuggestion,
  ] = React.useState<AutocompleteItem | null>(null);

  const applyChangedValueAndValueLabel = React.useCallback(() => {
    if (!onChange) {
      return;
    }

    if (freeSolo) {
      // value & valueLabel should be same in freeSolo mode, ignore suggestion.value
      onChange(name, inputValue, inputValue);
    } else {
      // in Combo box mode, suggestions MUST be selected by click on suggestion
      const newValItem = getItemByKeyValue(
        sortedSuggestions,
        inputValue,
        isSuggestionContainsLabel ? 'label' : 'value',
      ) as AutocompleteItem;

      if (newValItem.value.toString() !== '') {
        // set selectedItem when exist in suggestions
        setSelectedSuggestion(newValItem);
      }

      onChange(name, inputValue, newValItem.value.toString());
    }
  }, [
    freeSolo,
    inputValue,
    isSuggestionContainsLabel,
    name,
    onChange,
    setSelectedSuggestion,
    sortedSuggestions,
  ]);

  const handleOnInputChange = React.useCallback(
    (_, newInputValue) => {
      if (!onChange) {
        return;
      }

      onChange(name, newInputValue);
    },
    [name, onChange],
  );

  const handleOnChange = React.useCallback((_, suggestion) => {
    setSelectedSuggestion(suggestion);
  }, []);

  return {
    selectedSuggestion,
    handleOnChange,
    applyChangedValueAndValueLabel,
    handleOnInputChange,
  };
};

export default useCommonFuncs;
