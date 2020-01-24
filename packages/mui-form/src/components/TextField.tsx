import React from 'react';

import MUITextField from '@material-ui/core/TextField';

import useKeepLabelSpace from './hooks/useKeepLabelSpace';
import { FieldProps } from './types';

const TypesNeedHover = ['date', 'time', 'week', 'month', 'datetime-local'];

type TextFieldProps = {
  type?: string;
  InputLabelProps?: any;
} & FieldProps;

const TextField = ({
  label = '',
  type = 'text',
  InputLabelProps = {},
  keepLabelSpace = false,
  className,
  ...restProps
}: TextFieldProps): JSX.Element => {
  const labelSpaceClass = useKeepLabelSpace({ className, keepLabelSpace });

  let extraLabelProps = {};
  if (TypesNeedHover.includes(type)) {
    extraLabelProps = { shrink: true };
  }

  const newInputLabelProps = {
    ...InputLabelProps,
    ...extraLabelProps,
  };

  return (
    <MUITextField
      {...restProps}
      label={label}
      className={labelSpaceClass}
      type={type}
      InputLabelProps={newInputLabelProps}
    />
  );
};

export default TextField;
