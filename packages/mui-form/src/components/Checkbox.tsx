import React from 'react';

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MUICheckbox,
} from '@material-ui/core';
import useKeepLabelSpace from './hooks/useKeepLabelSpace';
import useMuiDomFocusRipple from './hooks/useMuiDomFocusRipple';

import { FieldProps } from './ComponentTypes';

type CheckboxProps = {
  value?: boolean;
  checkedValue?: string;
} & FieldProps;

const Checkbox = ({
  label = '',
  required = false,
  value = false,
  checkedValue = '',
  helperText = '',
  error = false,
  fullWidth = false,
  keepLabelSpace = false,
  domFocusRipple = true,
  ...restProps
}: CheckboxProps): JSX.Element => {
  const labelSpaceClass = useKeepLabelSpace({
    keepLabelSpace,
  });
  const muiDomFocusRippleProps = useMuiDomFocusRipple();
  const extraProps = domFocusRipple ? muiDomFocusRippleProps : {};

  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      error={error}
      className={labelSpaceClass}
    >
      <FormControlLabel
        control={
          <MUICheckbox
            checked={value}
            value={checkedValue}
            color="primary"
            {...extraProps}
            {...restProps}
          />
        }
        label={label}
      />
      {helperTextPart}
    </FormControl>
  );
};

export default Checkbox;
