import React from 'react';

import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio as MUIRadio,
} from '@material-ui/core';
import FormLabel from './lib/MyFormLabel';
import FormHelperText from './lib/MyFormHelperText';

import { FieldProps, Item } from './types';

type RadioProps = {
  row?: boolean;
  items?: Item[];
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
              control={<MUIRadio color="primary" {...restProps} />}
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
