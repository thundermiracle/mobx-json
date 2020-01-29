import React from 'react';

import { Radio as MUIRadio } from '@material-ui/core';

import useMuiDomFocusRipple from '../hooks/useMuiDomFocusRipple';

import { FieldProps } from '../ComponentTypes';

const MyRadio = ({
  domFocusRipple = true,
  ...restProps
}: FieldProps): JSX.Element => {
  const muiDomFocusRippleProps = useMuiDomFocusRipple();
  const extraProps = domFocusRipple ? muiDomFocusRippleProps : {};

  return <MUIRadio {...extraProps} {...restProps} />;
};

export default MyRadio;
