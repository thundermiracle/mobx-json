/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import clsx from 'clsx';
import { pickBy, keys } from 'ramda';

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, FormGroup } from '@material-ui/core';
import FormLabel from './internal/MyFormLabel';
import FormHelperText from './internal/MyFormHelperText';
import SelectAllCheckbox from './internal/SelectAllCheckbox';
import MyCheckbox from './internal/MyCheckbox';

import useCheckboxes from './hooks/useCheckboxes';
import useKeepLabelSpace from './hooks/useKeepLabelSpace';

import { FieldProps } from './ComponentTypes';

const useStyles = makeStyles({
  hidden: {
    display: 'none',
  },
});

const Checkboxes = ({
  disabled = false,
  name,
  items,
  label,
  selectAll = false,
  selectAllLabel = 'ALL',
  required,
  hidden,
  value,
  helperText,
  error,
  onChange,
  keepLabelSpace = false,
  row = true,
  fullWidth = false,
  domFocusRipple = true,
  ...restProps
}: FieldProps): JSX.Element | null => {
  if (items == null) {
    return null;
  }

  const classes = useStyles();
  const labelSpaceClass = useKeepLabelSpace({ keepLabelSpace });
  const {
    itemsCheckedStatus,
    handleSelectAll,
    handleItemOnChange,
  } = useCheckboxes({
    name,
    items,
    value,
    onChange,
  });

  let selectAllPart;
  if (selectAll) {
    const checkedCount = keys(pickBy(val => val, itemsCheckedStatus)).length;

    selectAllPart = (
      <SelectAllCheckbox
        isSelected={checkedCount > 0}
        isIndeterminate={checkedCount > 0 && checkedCount < items.length}
        itemsCount={items.length}
        onChange={handleSelectAll}
        disabled={disabled}
        label={selectAllLabel}
      />
    );
  }

  const labelPart = label ? <FormLabel>{label}</FormLabel> : null;

  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      required={required}
      className={clsx({ [classes.hidden]: hidden }, labelSpaceClass)}
    >
      {labelPart}
      {selectAllPart}
      <FormGroup row={row}>
        {items.map(
          ({
            value: itemValue,
            disabled: itemDisabled,
            label: itemLabel,
          }: any) => {
            const itemValStr = itemValue.toString();

            return (
              <FormControlLabel
                key={itemValStr}
                control={
                  <MyCheckbox
                    name={name}
                    value={itemValStr}
                    checked={itemsCheckedStatus[itemValStr]}
                    onChange={handleItemOnChange}
                    disabled={disabled || itemDisabled}
                    color="primary"
                    domFocusRipple={domFocusRipple}
                    {...restProps}
                  />
                }
                label={itemLabel || itemValStr}
              />
            );
          },
        )}
      </FormGroup>
      {helperTextPart}
    </FormControl>
  );
};

export default Checkboxes;
