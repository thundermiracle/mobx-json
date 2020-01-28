import React from 'react';

import { Radio as MUIRadio } from '@material-ui/core';

import { FieldProps } from '../types';
import useMuiDomFocusRipple from '../hooks/useMuiDomFocusRipple';

const MyRadio = ({ domFocusRipple = true, ...restProps }: FieldProps) => {
  const muiDomFocusRippleProps = useMuiDomFocusRipple();
  const extraProps = domFocusRipple ? muiDomFocusRippleProps : {};

  return <MUIRadio {...extraProps} {...restProps} />;
};

export default MyRadio;
