import React from 'react';

import { TextFieldProps as MUITextFieldProps } from '@material-ui/core';

import TextFieldOutlined from './TextFieldOutlined';
import useSelectItems from './hooks/useSelectItems';

import { FieldProps } from './ComponentTypes';

type SelectProps = {
  emptyItem?: boolean;
} & FieldProps &
  MUITextFieldProps;

const SelectOutlined: React.FC<SelectProps> = ({
  items = [],
  emptyItem = false,
  ...restProps
}) => {
  const menuItems = useSelectItems({ emptyItem, items });

  return (
    <TextFieldOutlined {...restProps} select>
      {menuItems}
    </TextFieldOutlined>
  );
};

export default SelectOutlined;
