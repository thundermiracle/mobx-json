import React from 'react';

import {
  FormControlLabel,
  Checkbox as MUICheckbox,
  CheckboxProps as MUICheckboxProps,
} from '@material-ui/core';

type SelectAllCheckboxProps = {
  label: string;
  isSelected?: boolean;
  isIndeterminate?: boolean;
} & MUICheckboxProps;

const SelectAllCheckbox: React.FC<SelectAllCheckboxProps> = ({
  label,
  isSelected,
  isIndeterminate,
  ...restProps
}) => {
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
