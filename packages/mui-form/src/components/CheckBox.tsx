import React from 'react';

import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MUICheckbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  labelSpace: {
    paddingTop: 12,
  },
}));

interface Props {
  label?: string;
  required?: boolean;
  value?: boolean;
  checkedValue?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  keepLabelSpace?: boolean;
}

const CheckBox = ({
  label = '',
  required = false,
  value = false,
  checkedValue = '',
  helperText = '',
  error = false,
  fullWidth = false,
  keepLabelSpace = false,
  ...restProps
}: Props) => {
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

export default CheckBox;
