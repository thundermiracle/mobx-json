import React from 'react';
import getItemByValue from 'lib/getItemByValue';
import { isNilOrEmpty } from 'lib/utils';

import { Item } from '../ComponentTypes';

interface UseSelectInput {
  name: string;
  value: any;
  items: Item[];
  onChange: any;
}

interface UseSelect {
  selectedItem: Item;
  handleOnChange: any;
}

/**
 * customize onChange and pass selected label to onChange as well
 */
const useValueLabelOnChange = ({
  name,
  value,
  items,
  onChange,
}: UseSelectInput): UseSelect => {
  const selectedItem = getItemByValue(value, items);

  const handleOnChange = React.useCallback(
    e => {
      if (onChange) {
        if (isNilOrEmpty(e.target.value)) {
          onChange(e.target.name, '', '');
          return;
        }
        const targetItem = getItemByValue(e.target.value, items);
        onChange(name, targetItem.value, targetItem.label);
      }
    },
    [items, name, onChange],
  );

  // call onChange to apply valueLabel when items changed
  React.useEffect(() => {
    if (onChange && !isNilOrEmpty(selectedItem.value))
      onChange(name, selectedItem.value, selectedItem.label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return {
    selectedItem,
    handleOnChange,
  };
};

export default useValueLabelOnChange;
