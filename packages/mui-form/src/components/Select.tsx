import React from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
  MenuItem,
} from '@material-ui/core';

import { FieldProps } from './types';

const Select = ({
  error = false,
  required = false,
  label,
  keepLabelSpace,
  items = [],
  helperText,
  fullWidth = false,
  emptyItem = true,
  ...restProps
}: FieldProps) => {
  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  const emptyItemPart = emptyItem ? <MenuItem value="" /> : null;

  return (
    <FormControl required={required} error={error} fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <MUISelect {...restProps}>
        {emptyItemPart}
        {items.map(({ value: itemValue, label: itemLabel }: any) => (
          <MenuItem key={itemValue} value={itemValue}>
            {itemLabel || itemValue}
          </MenuItem>
        ))}
      </MUISelect>
      {helperTextPart}
    </FormControl>
  );
};

export default Select;
