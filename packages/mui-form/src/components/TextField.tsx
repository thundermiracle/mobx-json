import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
  InputAdornment,
} from '@material-ui/core';

import useKeepLabelSpace from './hooks/useKeepLabelSpace';
import IconWrapper from './internal/IconWrapper';

import { FieldProps } from './ComponentTypes';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const TypesNeedHover = ['date', 'time', 'week', 'month', 'datetime-local'];

export enum AdornmentPosition {
  start = 'start',
  end = 'end',
}

export type TextFieldProps = {
  InputLabelProps?: any;
  adornment?: any;
  adornmentPosition?: AdornmentPosition;
} & FieldProps &
  MUITextFieldProps;

const TextField: React.FC<TextFieldProps> = ({
  label = '',
  type = 'text',
  InputLabelProps = {},
  keepLabelSpace = false,
  IconComponent,
  className,
  adornment,
  adornmentPosition = AdornmentPosition.end,
  hidden,
  ...restProps
}) => {
  const classes = useStyles();
  const labelSpaceClass = useKeepLabelSpace({ className, keepLabelSpace });

  let extraLabelProps = {};
  if (TypesNeedHover.includes(type)) {
    extraLabelProps = { shrink: true };
  }

  const newInputLabelProps = {
    ...InputLabelProps,
    ...extraLabelProps,
  };

  let inputPropsPart = {};
  if (adornment) {
    let InputProps;
    switch (adornmentPosition) {
      case AdornmentPosition.start:
        InputProps = {
          startAdornment: (
            <InputAdornment position="start">{adornment}</InputAdornment>
          ),
        };
        break;
      case AdornmentPosition.end:
      default:
        InputProps = {
          endAdornment: (
            <InputAdornment position="end">{adornment}</InputAdornment>
          ),
        };
        break;
    }
    inputPropsPart = {
      InputProps,
    };
  }

  return (
    <IconWrapper
      IconComponent={IconComponent}
      disabled={restProps.disabled}
      hidden={hidden}
    >
      <MUITextField
        label={label}
        className={clsx(labelSpaceClass, classes.root)}
        type={type}
        InputLabelProps={newInputLabelProps}
        {...inputPropsPart}
        {...restProps}
      />
    </IconWrapper>
  );
};

export default TextField;
