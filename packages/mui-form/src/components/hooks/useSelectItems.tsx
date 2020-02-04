import React from 'react';

import { MenuItem } from '@material-ui/core';

import { Item } from '../ComponentTypes';

interface UseSelectItems {
  emptyItem?: boolean;
  items?: Item[];
}

const useSelectItems = ({
  emptyItem,
  items = [],
}: UseSelectItems): JSX.Element[] => {
  const menuItems = items.map(
    ({ value: itemValue, label: itemLabel }: Item) => (
      <MenuItem key={itemValue.toString()} value={itemValue}>
        {itemLabel || itemValue}
      </MenuItem>
    ),
  );

  if (emptyItem) {
    menuItems.unshift(
      // eslint-disable-next-line react/self-closing-comp
      <MenuItem key="emptyValue" value="">
        　
      </MenuItem>,
    );
  }

  return menuItems;
};

export default useSelectItems;
