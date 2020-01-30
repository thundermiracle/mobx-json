import React from 'react';

import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import FormLabel from './internal/MyFormLabel';
import FormHelperText from './internal/MyFormHelperText';
import MyRadio from './internal/MyRadio';

import { FieldProps, Item } from './ComponentTypes';

type RadioProps = {
  row?: boolean;
  domFocusRipple?: boolean;
} & FieldProps;

const Radio: React.FC<RadioProps> = ({
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
}) => {
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
