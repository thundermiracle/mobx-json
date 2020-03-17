/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import clsx from 'clsx';
import pickBy from 'ramda/src/pickBy';
import keys from 'ramda/src/keys';

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, FormGroup } from '@material-ui/core';
import FormLabel from './internal/MyFormLabel';
import FormHelperText from './internal/MyFormHelperText';
import SelectAllCheckbox from './internal/SelectAllCheckbox';
import MyCheckbox from './internal/MyCheckbox';
import IconWrapper from './internal/IconWrapper';

import useCheckboxes from './hooks/useCheckboxes';
import useKeepLabelSpace from './hooks/useKeepLabelSpace';
import useAsyncLoadItems from './hooks/useAsyncLoadItems';

import { FieldProps } from './ComponentTypes';

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none',
  },
  icon: {
    paddingBottom: 7,
  },
  groupRoot: {
    height: theme.spacing(4), // change the default height of checkboxes
  },
  helperText: {
    marginTop: theme.spacing(1),
  },
}));

type CheckboxesProps = {
  selectAll?: boolean;
  selectAllLabel?: string;
  value?: string[] | number[];
  row?: boolean;
  domFocusRipple?: boolean;
} & FieldProps;

const Checkboxes: React.FC<CheckboxesProps> = ({
  disabled = false,
  name,
  items: initItems = [],
  label,
  selectAll = false,
  selectAllLabel = 'ALL',
  required,
  hidden,
  value = [],
  helperText,
  error,
  onChange,
  keepLabelSpace = false,
  row = true,
  fullWidth = false,
  domFocusRipple = true,
  IconComponent,
  loaderSize = 24,
  forceLoadOnce,
  asyncLoadItems,
  ...restProps
}) => {
  if (initItems == null) {
    return null;
  }

  const classes = useStyles();
  const labelSpaceClass = useKeepLabelSpace({ keepLabelSpace });
  const { items, loading, loader } = useAsyncLoadItems({
    initItems,
    loaderSize,
    loaderStyle: { left: 10, top: 25 },
    forceLoadOnce,
    asyncLoadItems,
  });

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
        onChange={handleSelectAll}
        disabled={disabled}
        label={selectAllLabel}
      />
    );
  }

  const labelPart = label ? <FormLabel>{label}</FormLabel> : null;

  const helperTextPart = helperText ? (
    <FormHelperText className={classes.helperText}>{helperText}</FormHelperText>
  ) : null;

  return (
    <IconWrapper
      IconComponent={IconComponent}
      iconClassName={classes.icon}
      disabled={disabled}
      hidden={hidden}
    >
      <FormControl
        fullWidth={fullWidth}
        error={error}
        required={required}
        className={clsx({ [classes.hidden]: hidden }, labelSpaceClass)}
      >
        {labelPart}
        {loading ? null : selectAllPart}
        <FormGroup row={row} className={classes.groupRoot}>
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
        {loader}
        {helperTextPart}
      </FormControl>
    </IconWrapper>
  );
};

export default Checkboxes;
