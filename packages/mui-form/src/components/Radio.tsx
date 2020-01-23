import React from 'react';

import clsx from 'clsx';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio as MUIRadio,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps, Item } from './types';

const useStyles = makeStyles({
  label: {
    fontSize: `${13 / 16}rem`,
  },
  directionHorizon: {
    flexDirection: 'row',
  },
});

enum Direction {
  Horizon = 'horizon',
  Vertical = 'vertical',
}

type RadioProps = {
  direction?: Direction;
  items?: Item[];
} & FieldProps;

const Radio = ({
  label = '',
  required = false,
  error = false,
  helperText = '',
  fullWidth = false,
  direction = Direction.Horizon,
  className,
  items = [],
  ...restProps
}: RadioProps): JSX.Element => {
  const classes = useStyles();

  const helperTextPart = helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      required={required}
      component="fieldset"
    >
      <FormLabel component="legend" className={classes.label}>
        {label}
      </FormLabel>
      <RadioGroup
        aria-label="gender"
        {...restProps}
        className={clsx(
          { [classes.directionHorizon]: direction === Direction.Horizon },
          className,
        )}
      >
        {items.map(({ label, value, ...restProperties }: Item) => (
          <FormControlLabel
            key={value.toString()}
            value={value}
            control={<MUIRadio />}
            label={label || value}
            {...restProperties}
          />
        ))}
      </RadioGroup>
      {helperTextPart}
    </FormControl>
  );
};

export default Radio;
