import React from 'react';

import { Radio as MUIRadio, RadioProps } from '@material-ui/core';

import useMuiDomFocusRipple from '../hooks/useMuiDomFocusRipple';

type MyRadioProps = {
  domFocusRipple?: boolean;
} & RadioProps;

const MyRadio: React.FC<MyRadioProps> = ({
  domFocusRipple = true,
  ...restProps
}) => {
  const muiDomFocusRippleProps = useMuiDomFocusRipple();
  const extraProps = domFocusRipple ? muiDomFocusRippleProps : {};

  return <MUIRadio {...extraProps} {...restProps} />;
};

export default MyRadio;
