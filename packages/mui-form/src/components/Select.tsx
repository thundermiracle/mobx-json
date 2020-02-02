import React from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
  SelectProps as MUISelectProps,
} from '@material-ui/core';

import useSelectItems from './hooks/useSelectItems';
import IconWrapper from './internal/IconWrapper';
import { FieldProps } from './ComponentTypes';

type SelectProps = {
  emptyItem?: boolean;
} & FieldProps &
  MUISelectProps;

const Select: React.FC<SelectProps> = ({
  error = false,
  required = false,
  label,
  keepLabelSpace = false,
  items = [],
  helperText,
  fullWidth = false,
  emptyItem = false,
  IconComponent,
  ...restProps
}) => {
  const menuItems = useSelectItems({ emptyItem, items });

  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  const labelPart =
    label || keepLabelSpace ? <InputLabel>{label}</InputLabel> : null;

  return (
    <IconWrapper IconComponent={IconComponent}>
      <FormControl required={required} error={error} fullWidth={fullWidth}>
        {labelPart}
        <MUISelect {...restProps}>{menuItems}</MUISelect>
        {helperTextPart}
      </FormControl>
    </IconWrapper>
  );
};

export default Select;
