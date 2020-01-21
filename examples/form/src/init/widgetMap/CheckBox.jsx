import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import MUICheckBox from '@material-ui/core/Checkbox';

const CheckBox = ({
  label,
  value,
  helperText,
  error,
  fullWidth,
  ...restProps
}) => {
  return (
    <FormControlLabel
      control={<MUICheckBox checked={value} {...restProps} />}
      label={label}
    />
  );
};

CheckBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

CheckBox.defaultProps = {
  label: '',
  value: false,
  helperText: '',
  error: false,
  fullWidth: false,
};

export default CheckBox;
