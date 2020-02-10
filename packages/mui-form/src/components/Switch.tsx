import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  Switch as MUISwitch,
  SwitchProps as MUISwitchProps,
} from '@material-ui/core';
import useMuiDomFocusRipple from './hooks/useMuiDomFocusRipple';

import { FieldProps } from './ComponentTypes';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
    justifyContent: 'space-between',
  },
  hidden: {
    display: 'none',
  },
});

type SwitchProps = {
  domFocusRipple?: boolean;
} & FieldProps &
  MUISwitchProps;

const Switch: React.FC<SwitchProps> = ({
  label,
  fullWidth = false,
  labelPlacement = 'end',
  error,
  helperText,
  domFocusRipple = true,
  hidden = false,
  ...restProps
}) => {
  const classes = useStyles();
  const muiDomFocusRippleProps = useMuiDomFocusRipple();
  const extraProps = domFocusRipple ? muiDomFocusRippleProps : {};

  return (
    <FormControlLabel
      className={clsx({
        [classes.fullWidth]: fullWidth,
        [classes.hidden]: hidden,
      })}
      label={label}
      control={<MUISwitch color="primary" {...extraProps} {...restProps} />}
      labelPlacement={labelPlacement}
    />
  );
};

export default Switch;
