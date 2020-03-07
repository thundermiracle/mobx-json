import React from 'react';

import { TextFieldProps as MUITextFieldProps } from '@material-ui/core';

import TextFieldOutlined from './TextFieldOutlined';
import useSelectItems from './hooks/useSelectItems';

import { FieldProps } from './ComponentTypes';
import useAsyncLoadItems from './hooks/useAsyncLoadItems';

type SelectProps = {
  emptyItem?: boolean;
} & FieldProps &
  MUITextFieldProps;

const SelectOutlined: React.FC<SelectProps> = ({
  items: initItems = [],
  emptyItem = false,
  loaderSize = 24,
  asyncLoadItems,
  ...restProps
}) => {
  const [items, setItems] = React.useState(initItems);
  const { itemsLoading, loader } = useAsyncLoadItems({
    items,
    setItems,
    loaderSize,
    loaderStyle: { right: 40, bottom: 15 },
    asyncLoadItems,
  });
  const menuItems = useSelectItems({ emptyItem, items });

  return (
    <TextFieldOutlined
      {...restProps}
      select
      adornment={loader}
      disabled={itemsLoading}
    >
      {menuItems}
    </TextFieldOutlined>
  );
};

export default SelectOutlined;
