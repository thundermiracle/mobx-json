import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import FormLabel from './internal/MyFormLabel';
import FormHelperText from './internal/MyFormHelperText';
import MyRadio from './internal/MyRadio';
import IconWrapper from './internal/IconWrapper';

import { FieldProps, Item } from './ComponentTypes';

const useStyles = makeStyles({
  icon: {
    paddingBottom: 7,
  },
});

type RadioProps = {
  row?: boolean;
  domFocusRipple?: boolean;
} & FieldProps;

const Radio: React.FC<RadioProps> = ({
  label = '',
  required = false,
  error = false,
  helperText = '',
  fullWidth = false,
  row = true,
  items = [],
  value,
  onChange,
  domFocusRipple = true,
  IconComponent,
  ...restProps
}) => {
  const classes = useStyles();

  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  return (
    <IconWrapper IconComponent={IconComponent} iconClassName={classes.icon}>
      <FormControl
        fullWidth={fullWidth}
        error={error}
        required={required}
        component="fieldset"
      >
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          aria-label="gender"
          row={row}
          value={value}
          onChange={onChange}
        >
          {items.map(
            ({
              label: itemLabel,
              value: itemValue,
              ...restProperties
            }: Item) => (
              <FormControlLabel
                key={itemValue.toString()}
                value={itemValue}
                control={
                  <MyRadio
                    color="primary"
                    domFocusRipple={domFocusRipple}
                    {...restProps}
                  />
                }
                label={itemLabel || itemValue}
                {...restProperties}
              />
            ),
          )}
        </RadioGroup>
        {helperTextPart}
      </FormControl>
    </IconWrapper>
  );
};

export default Radio;
