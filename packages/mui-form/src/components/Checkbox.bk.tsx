import React from 'react';

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MUICheckbox,
} from '@material-ui/core';
import { FieldProps } from './types';
import useKeepLabelSpace from './hooks/useKeepLabelSpace';

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
  ...restProps
}: CheckboxProps): JSX.Element => {
  const labelSpaceClass = useKeepLabelSpace({
    keepLabelSpace,
  });

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
          <MUICheckbox checked={value} value={checkedValue} {...restProps} />
        }
        label={label}
      />
      {helperTextPart}
    </FormControl>
  );
};

export default Checkbox;
