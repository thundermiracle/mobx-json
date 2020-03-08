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
  forceLoadOnce,
  asyncLoadItems,
  ...restProps
}) => {
  const { items, loading, loader } = useAsyncLoadItems({
    initItems,
    loaderSize,
    loaderStyle: { right: 40, bottom: 15 },
    forceLoadOnce,
    asyncLoadItems,
  });
  const menuItems = useSelectItems({ emptyItem, items });

  return (
    <TextFieldOutlined
      {...restProps}
      select
      adornment={loader}
      disabled={loading || items.length === 0}
    >
      {menuItems}
    </TextFieldOutlined>
  );
};

export default SelectOutlined;
