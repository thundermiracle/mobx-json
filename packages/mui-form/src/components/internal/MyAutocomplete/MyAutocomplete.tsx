import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';

import { isNilOrEmpty } from 'lib/utils';
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
  InputPropsClassName,
  inputPropsClassName,
  ...restProps
}) => {
  const classes = useStyles();
  const [suggestions, setSuggestions] = React.useState(initSuggestions);

  const sortedSuggestions = React.useMemo(() => sortSuggestions(suggestions), [
    suggestions,
  ]);

  const useLoadProps = reloadOnInput ? useLoadRealtime : useLoadOnce;
  const { suggestionsLoading, ...loadProps } = useLoadProps({
    name,
    inputValue: value,
    reloadDelay,
    reloadExcludeRegex,
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

  // options(suggestions)
  let options = suggestionsLoading
    ? [{ value: loaderText }]
    : sortedSuggestions;
  if (reloadOnInput && isNilOrEmpty(value)) {
    // DON'T show options if load suggestions async & value is empty
    options = [];
  }

  return (
    <MuiAutocomplete
      freeSolo={freeSolo}
      autoHighlight={autoHighlight}
      autoComplete={autoComplete}
      autoSelect={autoSelect}
      loading={suggestionsLoading}
      options={options}
      getOptionLabel={getSuggestionLabel}
      inputValue={value}
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
      renderOption={highlightSuggestion}
      {...loadProps}
      {...groupByProp}
      {...extraAutocompleteProps}
    />
  );
};

export default MyAutocomplete;
