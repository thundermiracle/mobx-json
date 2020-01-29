import React from 'react';

import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import FormLabel from './lib/MyFormLabel';
import FormHelperText from './lib/MyFormHelperText';

import { FieldProps, Item } from './types';
import MyRadio from './lib/MyRadio';

type RadioProps = {
  row?: boolean;
} & FieldProps;

const Radio = ({
  label = '',
  required = false,
  error = false,
  helperText = '',
  fullWidth = false,
  row = true,
  items = [],
  value,
  onChange,
  domFocusRipple = true,
  ...restProps
}: RadioProps): JSX.Element => {
  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      required={required}
      component="fieldset"
    >
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        aria-label="gender"
        row={row}
        value={value}
        onChange={onChange}
      >
        {items.map(
          ({ label: itemLabel, value: itemValue, ...restProperties }: Item) => (
            <FormControlLabel
              key={itemValue.toString()}
              value={itemValue}
              control={
                <MyRadio
                  color="primary"
                  domFocusRipple={domFocusRipple}
                  {...restProps}
                />
              }
              label={itemLabel || itemValue}
              {...restProperties}
            />
          ),
        )}
      </RadioGroup>
      {helperTextPart}
    </FormControl>
  );
};

export default Radio;
