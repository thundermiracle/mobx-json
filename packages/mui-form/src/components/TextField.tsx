import React from 'react';

import clsx from 'clsx';
import MUITextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { FieldProps } from './types';

const TypesNeedHover = ['date', 'time', 'week', 'month', 'datetime-local'];

const useStyles = makeStyles(() => ({
  labelSpace: {
    paddingTop: 16,
  },
}));

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
  const classes = useStyles();

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
      className={clsx(
        { [classes.labelSpace]: keepLabelSpace && !label },
        className,
      )}
      type={type}
      InputLabelProps={newInputLabelProps}
    />
  );
};

export default TextField;
