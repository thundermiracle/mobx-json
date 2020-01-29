import React from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
  MenuItem,
} from '@material-ui/core';

import { FieldProps } from './ComponentTypes';

const Select = ({
  error = false,
  required = false,
  label,
  keepLabelSpace = false,
  items = [],
  helperText,
  fullWidth = false,
  emptyItem = false,
  ...restProps
}: FieldProps): JSX.Element => {
  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  const emptyItemPart = emptyItem ? <MenuItem value="" /> : null;

  const labelPart =
    label || keepLabelSpace ? <InputLabel>{label}</InputLabel> : null;

  return (
    <FormControl required={required} error={error} fullWidth={fullWidth}>
      {labelPart}
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
