import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Switch as MUISwitch } from '@material-ui/core';
import { FieldProps } from './types';
import useMuiDomFocusRipple from './hooks/useMuiDomFocusRipple';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
    justifyContent: 'space-between',
  },
});

const Switch = ({
  label,
  fullWidth = false,
  labelPlacement = 'end',
  error,
  helperText,
  domFocusRipple = true,
  ...restProps
}: FieldProps) => {
  const classes = useStyles();
  const muiDomFocusRippleProps = useMuiDomFocusRipple();
  const extraProps = domFocusRipple ? muiDomFocusRippleProps : {};

  return (
    <FormControlLabel
      className={clsx({ [classes.fullWidth]: fullWidth })}
      label={label}
      control={<MUISwitch color="primary" {...extraProps} {...restProps} />}
      labelPlacement={labelPlacement}
    />
  );
};

export default Switch;
