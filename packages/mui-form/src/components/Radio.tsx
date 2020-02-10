import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import FormLabel from './internal/MyFormLabel';
import FormHelperText from './internal/MyFormHelperText';
import MyRadio from './internal/MyRadio';
import IconWrapper from './internal/IconWrapper';

import { FieldProps, Item } from './ComponentTypes';

const useStyles = makeStyles(theme => ({
  icon: {
    paddingBottom: 7,
  },
  groupRoot: {
    height: theme.spacing(4), // change the default height of checkboxes
  },
  helperText: {
    marginTop: theme.spacing(1),
  },
}));

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
  hidden = false,
  ...restProps
}) => {
  const classes = useStyles();

  const helperTextPart = helperText ? (
    <FormHelperText className={classes.helperText}>{helperText}</FormHelperText>
  ) : null;

  return (
    <IconWrapper
      IconComponent={IconComponent}
      iconClassName={classes.icon}
      disabled={restProps.disabled}
      hidden={hidden}
    >
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
          className={classes.groupRoot}
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
