import React from 'react';

import clsx from 'clsx';
import { FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import formatter from 'lib/formatter';

import MyFormLabel from './lib/MyFormLabel';
import { FieldProps } from './types';

const useStyles = makeStyles({
  label: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    marginTop: 24,
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.38)',
  },
});

const Display = ({
  label,
  fullWidth = false,
  required = false,
  disabled = false,
  value,
  format,
}: FieldProps) => {
  const classes = useStyles();

  let displayValue = value;
  if (format) {
    displayValue = formatter(value, format.type, format.template);
  }

  return (
    <FormControl fullWidth={fullWidth}>
      <MyFormLabel className={classes.label}>{label}</MyFormLabel>
      <Typography
        className={clsx({ [classes.disabled]: disabled }, classes.content)}
      >
        {displayValue}
      </Typography>
    </FormControl>
  );
};

export default Display;
