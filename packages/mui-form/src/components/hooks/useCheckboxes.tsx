import React from 'react';
import pickBy from 'ramda/src/pickBy';
import keys from 'ramda/src/keys';
import { propAll, valsToString, zipObjArrWithVal } from 'lib/utils';

import { Item, OnChange } from '../ComponentTypes';

interface CheckStatus {
  [key: string]: boolean;
}

interface UseCheckboxesInput {
  name: string;
  items: Item[];
  value: string[] | number[];
  onChange?: OnChange;
}

interface UseCheckboxes {
  itemsCheckedStatus: CheckStatus;
  handleSelectAll: OnChange;
  handleItemOnChange: OnChange;
}

const initCheckStatus = (
  itemVals: string[] | number[],
  checkedVals: string[] | number[],
): CheckStatus => {
  // array[any] -> array[string]
  const itemValsStr = valsToString(itemVals);
  const checkedValsStr = valsToString(checkedVals);

  // array[checked value] -> { checkedvalue: true, uncheckedvalue: false }
  const checkedValsObj = zipObjArrWithVal(true, checkedValsStr);
  const uncheckedAllValsObj = zipObjArrWithVal(false, itemValsStr);

  // init Checkboxes internal status
  const initStatus = {
    ...uncheckedAllValsObj,
    ...checkedValsObj,
  };

  return initStatus;
};

function useCheckboxes({
  name,
  items,
  value: checkedVals,
  onChange,
}: UseCheckboxesInput): UseCheckboxes {
  const itemVals = propAll('value', items);
  const initStatus = initCheckStatus(itemVals, checkedVals);
  const [itemsCheckedStatus, setItemsCheckedStatus] = React.useState(
    initStatus,
  );

  // recalculate check status if value changed
  React.useEffect(() => {
    setItemsCheckedStatus(initStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedVals]);

  const handleSelectAll = React.useCallback(
    e => {
      const isChecked = e.target.checked;

      if (onChange) {
        // as controlled component
        const itemValsStr = valsToString(itemVals);
        onChange(name, isChecked ? itemValsStr : []);
      } else {
        // as uncontrolled component
        const newCheckStatus = zipObjArrWithVal(isChecked, itemVals);
        setItemsCheckedStatus(newCheckStatus);
      }
    },
    [itemVals, onChange, name],
  );

  const handleItemOnChange = React.useCallback(
    e => {
      const valStr = e.target.value;
      const valStatus = e.target.checked;

      const newCheckStatus = {
        ...itemsCheckedStatus,
        [valStr]: valStatus,
      };

      const valCheckedArray = keys(pickBy(val => val, newCheckStatus));

      if (onChange) {
        // as controlled component
        onChange(name, valCheckedArray);
      } else {
        // as uncontrolled component
        setItemsCheckedStatus(newCheckStatus);
      }
    },
    [itemsCheckedStatus, onChange, name],
  );

  return {
    itemsCheckedStatus,
    handleSelectAll,
    handleItemOnChange,
  };
}

export default useCheckboxes;
