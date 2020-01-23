import React from 'react';

import clsx from 'clsx';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MUICheckbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps } from './types';

const useStyles = makeStyles(() => ({
  labelSpace: {
    paddingTop: 12,
  },
}));

type CheckboxProps = {
  value?: boolean;
  checkedValue?: string;
} & FieldProps;

const Checkbox = ({
  label = '',
  required = false,
  value = false,
  checkedValue = '',
  helperText = '',
  error = false,
  fullWidth = false,
  keepLabelSpace = false,
  ...restProps
}: CheckboxProps): JSX.Element => {
  const classes = useStyles();

  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      error={error}
      className={clsx({ [classes.labelSpace]: keepLabelSpace })}
    >
      <FormControlLabel
        control={
          <MUICheckbox checked={value} value={checkedValue} {...restProps} />
        }
        label={label}
      />
      {helperTextPart}
    </FormControl>
  );
};

export default Checkbox;
