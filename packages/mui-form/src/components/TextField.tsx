import React from 'react';

import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from '@material-ui/core';

import useKeepLabelSpace from './hooks/useKeepLabelSpace';

import { FieldProps } from './ComponentTypes';

const TypesNeedHover = ['date', 'time', 'week', 'month', 'datetime-local'];

type TextFieldProps = {
  InputLabelProps?: any;
} & FieldProps &
  MUITextFieldProps;

const TextField: React.FC<TextFieldProps> = ({
  label = '',
  type = 'text',
  InputLabelProps = {},
  keepLabelSpace = false,
  className,
  ...restProps
}) => {
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
