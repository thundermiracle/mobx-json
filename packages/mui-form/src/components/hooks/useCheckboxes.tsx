import React from 'react';
import { pickBy, keys, without } from 'ramda';
import { propAll, valsToString, zipObjArrWithVal } from 'lib/utils';

const initCheckStatus = (itemVals: any, checkedVals: any) => {
  // array[any] -> array[string]
  const itemValsStr = valsToString(itemVals);
  const checkedValsStr = valsToString(checkedVals);
  const uncheckedValsStr = without(checkedVals, itemValsStr);

  // array[checked value] -> { checkedvalue: true, uncheckedvalue: false }
  const checkedValsObj = zipObjArrWithVal(true, checkedValsStr);
  const uncheckedValsObj = zipObjArrWithVal(false, uncheckedValsStr);

  // init Checkboxes internal status
  const initStatus = {
    ...checkedValsObj,
    ...uncheckedValsObj,
  };

  return initStatus;
};

function useCheckboxes({ name, items, value: checkedVals, onChange }: any) {
  const itemVals = propAll('value', items);
  const initStatus = initCheckStatus(itemVals, checkedVals);
  const [checkedStatus, setCheckStatus] = React.useState(initStatus);

  // recalculate check status if value changed
  React.useEffect(() => {
    setCheckStatus(initStatus);
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
        setCheckStatus(newCheckStatus);
      }
    },
    [itemVals, onChange, name],
  );

  const handleItemOnChange = React.useCallback(
    e => {
      const valStr = e.target.name;
      const valStatus = e.target.checked;

      const newCheckStatus = {
        ...checkedStatus,
        [valStr]: valStatus,
      };

      const valCheckedArray = keys(pickBy(val => val, newCheckStatus));

      if (onChange) {
        // as controlled component
        onChange(name, valCheckedArray);
      } else {
        // as uncontrolled component
        setCheckStatus(newCheckStatus);
      }
    },
    [checkedStatus, onChange, name],
  );

  return { checkStatus: checkedStatus, handleSelectAll, handleItemOnChange };
}

export default useCheckboxes;
