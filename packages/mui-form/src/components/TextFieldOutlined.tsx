import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { TextField as MUITextField } from '@material-ui/core';

import { rmNilProps } from 'lib/utils';
import useIconAdornment from './hooks/useIconAdornment';

import { TextFieldProps, AdornmentPosition } from './TextField';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  hidden: {
    display: 'none',
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
  hidden,
  InputProps: originInputProps = {},
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
      className={clsx(classes.root, { [classes.hidden]: hidden })}
      type={type}
      variant="outlined"
      InputLabelProps={newInputLabelProps}
      InputProps={{ ...InputProps, ...rmNilProps(originInputProps) }}
      {...restProps}
    />
  );
};

export default TextFieldOutlined;
