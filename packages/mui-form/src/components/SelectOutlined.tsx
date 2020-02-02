import React from 'react';

import {
  MenuItem,
  TextFieldProps as MUITextFieldProps,
} from '@material-ui/core';

import { FieldProps } from './ComponentTypes';

import TextFieldOutlined from './TextFieldOutlined';

type SelectProps = {
  emptyItem?: boolean;
} & FieldProps &
  MUITextFieldProps;

const SelectOutlined: React.FC<SelectProps> = ({
  items = [],
  emptyItem = false,
  ...restProps
}) => {
  const emptyItemPart = emptyItem ? <MenuItem value="" /> : null;

  return (
    <TextFieldOutlined {...restProps} select>
      {emptyItemPart}
      {items.map(({ value: itemValue, label: itemLabel }: any) => (
        <MenuItem key={itemValue} value={itemValue}>
          {itemLabel || itemValue}
        </MenuItem>
      ))}
    </TextFieldOutlined>
  );
};

export default SelectOutlined;
