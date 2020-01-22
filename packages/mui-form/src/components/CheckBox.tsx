import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import MUICheckBox from '@material-ui/core/Checkbox';

interface Props {
  label?: string;
  value?: boolean;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
}

const CheckBox = ({
  label = '',
  value = false,
  helperText = '',
  error = false,
  fullWidth = false,
  ...restProps
}: Props) => {
  return (
    <FormControlLabel
      control={<MUICheckBox checked={value} {...restProps} />}
      label={label}
    />
  );
};

export default CheckBox;
