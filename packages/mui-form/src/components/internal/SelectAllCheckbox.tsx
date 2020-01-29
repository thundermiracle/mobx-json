import React from 'react';

import { FormControlLabel, Checkbox as MUICheckbox } from '@material-ui/core';

import { FieldProps } from '../ComponentTypes';

const SelectAllCheckbox = ({
  label,
  isSelected,
  isIndeterminate,
  ...restProps
}: FieldProps): JSX.Element => {
  return (
    <FormControlLabel
      control={
        <MUICheckbox
          color="primary"
          checked={isSelected}
          indeterminate={isIndeterminate}
          {...restProps}
        />
      }
      label={label}
    />
  );
};

export default SelectAllCheckbox;
