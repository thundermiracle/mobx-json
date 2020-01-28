import React from 'react';

import { Checkbox as MUICheckbox } from '@material-ui/core';

import { FieldProps } from '../types';
import useMuiDomFocusRipple from '../hooks/useMuiDomFocusRipple';

const MyCheckbox = ({ domFocusRipple = true, ...restProps }: FieldProps) => {
  const muiDomFocusRippleProps = useMuiDomFocusRipple();
  const extraProps = domFocusRipple ? muiDomFocusRippleProps : {};

  return <MUICheckbox {...extraProps} {...restProps} />;
};

export default MyCheckbox;
