import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { TextField as MUITextField } from '@material-ui/core';

import useIconAdornment from './hooks/useIconAdornment';

import { TextFieldProps, AdornmentPosition } from './TextField';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const TextFieldOutlined: React.FC<TextFieldProps> = ({
  label = '',
  type = 'text',
  InputLabelProps = {},
  IconComponent,
  className,
  adornment,
  adornmentPosition = AdornmentPosition.end,
  variant,
  ...restProps
}) => {
  const classes = useStyles();
  const InputProps = useIconAdornment({
    adornment,
    adornmentPosition,
    IconComponent,
  });

  const newInputLabelProps = {
    ...InputLabelProps,
    ...{ shrink: true },
  };

  return (
    <MUITextField
      label={label}
      className={classes.root}
      type={type}
      variant="outlined"
      InputLabelProps={newInputLabelProps}
      InputProps={InputProps}
      {...restProps}
    />
  );
};

export default TextFieldOutlined;
