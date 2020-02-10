import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MUICheckbox,
  CheckboxProps as MUICheckboxProps,
} from '@material-ui/core';
import useKeepLabelSpace from './hooks/useKeepLabelSpace';
import useMuiDomFocusRipple from './hooks/useMuiDomFocusRipple';

import { FieldProps } from './ComponentTypes';

const useStyles = makeStyles({
  hidden: {
    display: 'none',
  },
});

type CheckboxProps = {
  value?: boolean;
  checkedValue?: string;
} & FieldProps &
  MUICheckboxProps;

const Checkbox: React.FC<CheckboxProps> = ({
  label = '',
  required = false,
  value = false,
  checkedValue = '',
  helperText = '',
  error = false,
  fullWidth = false,
  keepLabelSpace = false,
  domFocusRipple = true,
  hidden = false,
  ...restProps
}) => {
  const classes = useStyles();
  const labelSpaceClass = useKeepLabelSpace({
    keepLabelSpace,
  });
  const muiDomFocusRippleProps = useMuiDomFocusRipple();
  const extraProps = domFocusRipple ? muiDomFocusRippleProps : {};

  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      error={error}
      className={clsx(labelSpaceClass, { [classes.hidden]: hidden })}
    >
      <FormControlLabel
        control={
          <MUICheckbox
            checked={value}
            value={checkedValue}
            color="primary"
            {...extraProps}
            {...restProps}
          />
        }
        label={label}
      />
      {helperTextPart}
    </FormControl>
  );
};

export default Checkbox;
