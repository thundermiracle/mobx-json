import React from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
  SelectProps as MUISelectProps,
} from '@material-ui/core';

import parseValByItems from 'lib/parseValByItems';
import useSelectItems from './hooks/useSelectItems';
import IconWrapper from './internal/IconWrapper';
import { FieldProps } from './ComponentTypes';
import useAsyncLoadItems from './hooks/useAsyncLoadItems';

type SelectProps = {
  emptyItem?: boolean;
} & FieldProps &
  MUISelectProps;

const Select: React.FC<SelectProps> = ({
  error = false,
  required = false,
  label,
  keepLabelSpace = false,
  items: initItems = [],
  helperText,
  fullWidth = false,
  emptyItem = false,
  IconComponent,
  hidden = false,
  name,
  loaderSize = 24,
  forceLoadOnce,
  asyncLoadItems,
  value,
  ...restProps
}) => {
  const { items, loading, loader } = useAsyncLoadItems({
    initItems,
    loaderSize,
    loaderStyle: { right: 30 },
    forceLoadOnce,
    asyncLoadItems,
  });
  const menuItems = useSelectItems({ emptyItem, items });

  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  const labelPart =
    label || keepLabelSpace ? <InputLabel>{label}</InputLabel> : null;

  return (
    <IconWrapper
      IconComponent={IconComponent}
      disabled={restProps.disabled}
      hidden={hidden}
    >
      <FormControl required={required} error={error} fullWidth={fullWidth}>
        {labelPart}
        <MUISelect
          name={name}
          disabled={loading || items.length === 0}
          SelectDisplayProps={{ id: `muiform_${name}` }}
          value={parseValByItems(value, items)}
          {...restProps}
        >
          {menuItems}
        </MUISelect>
        {helperTextPart}
        {loader}
      </FormControl>
    </IconWrapper>
  );
};

export default Select;
