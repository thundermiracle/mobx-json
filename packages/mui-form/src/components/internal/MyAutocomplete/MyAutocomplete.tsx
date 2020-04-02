import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';

import { isNilOrEmpty } from 'lib/utils';
import {
  needGroupBy,
  suggestionContainsLabel,
  sortSuggestions,
  groupBy,
  getSuggestionLabel,
  highlightSuggestion,
  highlightSuggestionCheckbox,
} from './internalFunctions';

import { MyAutocompleteProps } from './MyAutocompleteTypes';
import useLoadOnInput from './useLoadOnInput';
import useLoadOnce from './useLoadOnce';

const useStyles = makeStyles({
  clearIndicator: {
    padding: '4px !important',
    marginRight: -2,
    visibility: 'hidden',
  },
});

const MyAutocomplete: React.FC<MyAutocompleteProps> = ({
  name,
  loaderSize = 24,
  loaderText = 'Loading...',
  reloadOnInput = false,
  reloadExcludeRegex,
  reloadDelay,
  checkbox = false,
  freeSolo = true,
  autoSelect = false,
  autoComplete = false,
  openOnFocus = true,
  items: initSuggestions,
  value: inputValue,
  valueLabel: selectedValue,
  onChange,
  forceLoadOnce,
  asyncLoadItems,
  TextFieldComponent,
  extraAutocompleteProps = {},
  InputPropsClassName,
  inputPropsClassName,
  ...restProps
}) => {
  const classes = useStyles();
  const [suggestions, setSuggestions] = React.useState(initSuggestions);
  // reset the items by external params
  React.useEffect(() => {
    setSuggestions(initSuggestions);
  }, [initSuggestions]);

  const sortedSuggestions = React.useMemo(() => sortSuggestions(suggestions), [
    suggestions,
  ]);

  const useLoadProps = reloadOnInput ? useLoadOnInput : useLoadOnce;
  const { suggestionsLoading, ...loadProps } = useLoadProps({
    name,
    freeSolo,
    isSuggestionContainsLabel: suggestionContainsLabel(sortedSuggestions),
    inputValue,
    reloadDelay,
    reloadExcludeRegex,
    sortedSuggestions,
    onChange,
    forceLoadOnce,
    asyncLoadItems,
    setSuggestions,
  });

  let groupByProp;
  if (needGroupBy(suggestions)) {
    groupByProp = {
      groupBy,
    };
  }

  // options(suggestions)
  let options = suggestionsLoading
    ? [{ value: loaderText }]
    : sortedSuggestions;

  if (reloadOnInput && isNilOrEmpty(inputValue)) {
    // DON'T show options if load suggestions async & value is empty
    options = [];
  }

  return (
    <MuiAutocomplete
      freeSolo={freeSolo}
      autoHighlight={!freeSolo}
      autoComplete={autoComplete}
      autoSelect={autoSelect}
      openOnFocus={openOnFocus}
      loading={suggestionsLoading}
      options={options}
      getOptionLabel={getSuggestionLabel}
      inputValue={inputValue}
      classes={classes}
      renderInput={params => {
        const { InputProps } = params;
        const inputProps = (params.inputProps || {}) as any;

        return (
          <TextFieldComponent
            {...params}
            name={name}
            InputProps={{
              ...InputProps,
              className: clsx(InputProps.className, InputPropsClassName),
              endAdornment: (
                <>
                  {suggestionsLoading ? (
                    <CircularProgress color="secondary" size={loaderSize} />
                  ) : null}
                  {InputProps.endAdornment}
                </>
              ),
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{
              ...inputProps,
              className: clsx(inputProps.className, inputPropsClassName),
            }}
            {...restProps}
          />
        );
      }}
      renderOption={
        checkbox ? highlightSuggestionCheckbox : highlightSuggestion
      }
      {...loadProps}
      {...groupByProp}
      {...extraAutocompleteProps}
    />
  );
};

export default MyAutocomplete;
