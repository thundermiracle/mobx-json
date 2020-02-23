import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';

import {
  needGroupBy,
  sortSuggestions,
  groupBy,
  getSuggestionLabel,
  highlightSuggestion,
} from './internalFunctions';

import { MyAutocompleteProps } from './MyAutocompleteTypes';

const MyAutocomplete: React.FC<MyAutocompleteProps> = ({
  name,
  loading = false,
  loaderSize = 24,
  loaderText = 'Loading...',
  freeSolo = true,
  autoHighlight = false,
  autoComplete = false,
  autoSelect = false,
  items: initSuggestions,
  value,
  onChange,
  asyncLoadItems,
  TextFieldComponent,
  extraAutocompleteProps = {},
  ...restProps
}) => {
  const [suggestions, setSuggestions] = React.useState(initSuggestions);

  const sortedSuggestions = React.useMemo(() => sortSuggestions(suggestions), [
    suggestions,
  ]);

  let groupByProp;
  if (needGroupBy(suggestions)) {
    groupByProp = {
      groupBy,
    };
  }

  // show loading status if items are empty
  const suggestionsLoading = loading || sortedSuggestions.length === 0;

  // reset the items by external params
  React.useEffect(() => {
    setSuggestions(initSuggestions);
  }, [initSuggestions]);

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
  }, [asyncLoadItems, suggestionsLoading]);

  const handleInputChange = React.useCallback(
    (_, newVal) => {
      if (!suggestionsLoading && onChange) {
        onChange(name, newVal);
      }
    },
    [suggestionsLoading, name, onChange],
  );

  return (
    <MuiAutocomplete
      freeSolo={freeSolo}
      autoHighlight={autoHighlight}
      autoComplete={autoComplete}
      autoSelect={autoSelect}
      loading={suggestionsLoading}
      options={suggestionsLoading ? [{ value: loaderText }] : sortedSuggestions}
      getOptionLabel={getSuggestionLabel}
      inputValue={value}
      onInputChange={handleInputChange}
      renderInput={params => (
        <TextFieldComponent
          {...params}
          name={name}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {suggestionsLoading ? (
                  <CircularProgress color="secondary" size={loaderSize} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          {...restProps}
        />
      )}
      renderOption={highlightSuggestion}
      {...groupByProp}
      {...extraAutocompleteProps}
    />
  );
};

export default MyAutocomplete;
