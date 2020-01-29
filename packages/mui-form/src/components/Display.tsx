import React from 'react';

import clsx from 'clsx';
import { FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import formatter from 'lib/formatter';
import { findByPropVal } from 'lib/utils';

import MyFormLabel from './lib/MyFormLabel';
import { FieldProps } from './types';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
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
  disabled = false,
  value,
  format,
  keepLabelSpace = false,
  items,
}: FieldProps) => {
  const classes = useStyles();

  let displayValue = value;
  if (items) {
    // get display label from items
    const targetItem: any = findByPropVal('value', value, items) || {};
    displayValue = targetItem.label || targetItem.value;
  } else if (format) {
    // format value for display
    displayValue = formatter(value, format.type, format.template);
  }

  const displayLabel = label || keepLabelSpace;
  const labelPart = displayLabel ? (
    <MyFormLabel className={classes.label}>{label}</MyFormLabel>
  ) : null;

  return (
    <FormControl fullWidth={fullWidth} className={classes.root}>
      {labelPart}
      <Typography
        className={clsx({
          [classes.disabled]: disabled,
          [classes.content]: displayLabel,
        })}
      >
        {displayValue}
      </Typography>
    </FormControl>
  );
};

export default Display;
