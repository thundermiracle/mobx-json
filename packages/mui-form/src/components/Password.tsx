import React from 'react';

import { IconButton, InputAdornment, TextFieldProps } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import TextField from './TextField';

import { FieldProps } from './ComponentTypes';

type PasswordProps = FieldProps & TextFieldProps;

const Password: React.FC<PasswordProps> = ({ type, ...restProps }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = React.useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleMouseDownPassword = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    [],
  );

  return (
    <TextField
      {...restProps}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Password;
