import React from 'react';

import { Checkbox as MUICheckbox } from '@material-ui/core';

import useMuiDomFocusRipple from '../hooks/useMuiDomFocusRipple';

import { FieldProps } from '../ComponentTypes';

const MyCheckbox = ({
  domFocusRipple = true,
  ...restProps
}: FieldProps): JSX.Element => {
  const muiDomFocusRippleProps = useMuiDomFocusRipple();
  const extraProps = domFocusRipple ? muiDomFocusRippleProps : {};

  return <MUICheckbox {...extraProps} {...restProps} />;
};

export default MyCheckbox;
