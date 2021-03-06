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
import useCommonFuncs from './useCommonFuncs';

const useStyles = makeStyles({
  clearIndicator: {
    padding: '4px !important',
    marginRight: -2,
    visibility: 'hidden',
  },
});

const MyAutocomplete: React.FC<MyAutocompleteProps> = ({
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
  // following props are for TextField
  name,
  loaderSize = 24,
  fullWidth = false,
  disabled = false,
  error,
  InputPropsClassName,
  inputPropsClassName,
  label,
  IconComponent,
  helperText,
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
  const isSuggestionContainsLabel = suggestionContainsLabel(sortedSuggestions);

  const {
    selectedSuggestion,
    applyChangedValueAndValueLabel,
    handleOnChange,
    handleOnInputChange,
  } = useCommonFuncs({
    name,
    inputValue,
    freeSolo,
    isSuggestionContainsLabel,
    sortedSuggestions,
    onChange,
  });

  const useLoadProps = reloadOnInput ? useLoadOnInput : useLoadOnce;
  const { suggestionsLoading, ...loadProps } = useLoadProps({
    inputValue,
    reloadDelay,
    reloadExcludeRegex,
    sortedSuggestions,
    setSuggestions,
    forceLoadOnce,
    asyncLoadItems,
    applyChangedValueAndValueLabel,
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
      classes={classes}
      {...restProps}
      freeSolo={freeSolo}
      autoHighlight={!freeSolo}
      autoComplete={autoComplete}
      autoSelect={autoSelect}
      openOnFocus={openOnFocus}
      disabled={disabled}
      loading={suggestionsLoading}
      options={options}
      getOptionLabel={getSuggestionLabel}
      inputValue={inputValue}
      onInputChange={handleOnInputChange}
      value={selectedSuggestion}
      onChange={handleOnChange}
      renderInput={params => {
        const { InputProps } = params;
        const inputProps = (params.inputProps || {}) as any;

        return (
          <TextFieldComponent
            {...params}
            name={name}
            disabled={disabled}
            fullWidth={fullWidth}
            label={label}
            IconComponent={IconComponent}
            error={error}
            helperText={helperText}
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
