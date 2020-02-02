import React from 'react';

import { TextFieldProps } from '@material-ui/core';

import { FieldProps } from './ComponentTypes';
import useIconAdornment from './hooks/useIconAdornment';
import Password from './Password';

type PasswordProps = FieldProps & TextFieldProps;

const PasswordOutlined: React.FC<PasswordProps> = ({
  IconComponent,
  ...restProps
}) => {
  const IconInputProps = useIconAdornment({ IconComponent });

  return (
    <Password {...restProps} variant="outlined" InputProps={IconInputProps} />
  );
};

export default PasswordOutlined;
