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
import useLoadRealtime from './useLoadRealtime';
import useLoadOnce from './useLoadOnce';

const MyAutocomplete: React.FC<MyAutocompleteProps> = ({
  name,
  loaderSize = 24,
  loaderText = 'Loading...',
  reloadOnInput = false,
  reloadDelay,
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

  const useLoadProps = reloadOnInput ? useLoadRealtime : useLoadOnce;
  const { suggestionsLoading, ...realtimeProps } = useLoadProps({
    name,
    reloadDelay,
    sortedSuggestions,
    onChange,
    asyncLoadItems,
    setSuggestions,
  });

  let groupByProp;
  if (needGroupBy(suggestions)) {
    groupByProp = {
      groupBy,
    };
  }

  // reset the items by external params
  React.useEffect(() => {
    setSuggestions(initSuggestions);
  }, [initSuggestions]);

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
      {...realtimeProps}
      {...groupByProp}
      {...extraAutocompleteProps}
    />
  );
};

export default MyAutocomplete;
