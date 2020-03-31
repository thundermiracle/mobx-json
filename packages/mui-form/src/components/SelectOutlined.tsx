import React from 'react';

import { TextFieldProps as MUITextFieldProps } from '@material-ui/core';

import TextFieldOutlined from './TextFieldOutlined';
import useSelectItems from './hooks/useSelectItems';

import { FieldProps } from './ComponentTypes';
import useAsyncLoadItems from './hooks/useAsyncLoadItems';
import useValueLabelOnChange from './hooks/useValueLabelOnChange';

type SelectProps = {
  emptyItem?: boolean;
} & FieldProps &
  MUITextFieldProps;

const SelectOutlined: React.FC<SelectProps> = ({
  name,
  items: initItems = [],
  emptyItem = false,
  loaderSize = 24,
  forceLoadOnce,
  asyncLoadItems,
  value,
  onChange,
  valueLabel,
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
  const { selectedItem, handleOnChange } = useValueLabelOnChange({
    name: name!,
    value,
    items,
    onChange,
  });

  return (
    <TextFieldOutlined
      {...restProps}
      name={name}
      value={selectedItem.value}
      onChange={handleOnChange}
      select
      adornment={loader}
      disabled={loading || items.length === 0}
    >
      {menuItems}
    </TextFieldOutlined>
  );
};

export default SelectOutlined;
