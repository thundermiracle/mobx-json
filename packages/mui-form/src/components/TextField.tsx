import React from 'react';

import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
  InputAdornment,
} from '@material-ui/core';

import useKeepLabelSpace from './hooks/useKeepLabelSpace';
import IconWrapper from './internal/IconWrapper';

import { FieldProps } from './ComponentTypes';

const TypesNeedHover = ['date', 'time', 'week', 'month', 'datetime-local'];

enum AdornmentPosition {
  start = 'start',
  end = 'end',
}

type TextFieldProps = {
  InputLabelProps?: any;
  adornment?: string;
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
    <IconWrapper IconComponent={IconComponent}>
      <MUITextField
        {...restProps}
        label={label}
        className={labelSpaceClass}
        type={type}
        InputLabelProps={newInputLabelProps}
        {...inputPropsPart}
      />
    </IconWrapper>
  );
};

export default TextField;
