import React from 'react';

import { FormControlLabel, Checkbox as MUICheckbox } from '@material-ui/core';

import { FieldProps } from '../types';

function SelectAllCheckbox({ label, ...restProps }: FieldProps) {
  return (
    <FormControlLabel
      control={<MUICheckbox color="primary" {...restProps} />}
      label={label}
    />
  );
}

export default SelectAllCheckbox;
