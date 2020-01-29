import React from 'react';

import { Checkbox as MUICheckbox, CheckboxProps } from '@material-ui/core';

import useMuiDomFocusRipple from '../hooks/useMuiDomFocusRipple';

type MyCheckboxProps = {
  domFocusRipple?: boolean;
} & CheckboxProps;

const MyCheckbox = ({
  domFocusRipple = true,
  ...restProps
}: MyCheckboxProps): JSX.Element => {
  const muiDomFocusRippleProps = useMuiDomFocusRipple();
  const extraProps = domFocusRipple ? muiDomFocusRippleProps : {};

  return <MUICheckbox {...extraProps} {...restProps} />;
};

export default MyCheckbox;
