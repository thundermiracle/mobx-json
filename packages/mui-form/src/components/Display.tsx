import React from 'react';

import clsx from 'clsx';
import { FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import formatter from 'lib/formatter';
import { findByPropVal, nl2Arr, isNilOrEmpty } from 'lib/utils';

import MyFormLabel from './internal/MyFormLabel';

import { FieldProps } from './ComponentTypes';
import IconWrapper from './internal/IconWrapper';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  typo: {
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    marginTop: theme.spacing(3),
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.38)',
  },
  icon: {
    top: theme.spacing(3),
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
}));

const Display: React.FC<FieldProps> = ({
  label,
  fullWidth = false,
  disabled = false,
  value,
  format,
  keepLabelSpace = false,
  items,
  IconComponent,
}) => {
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
  // value to array value
  const displayValueArr = nl2Arr(displayValue);

  const displayLabel = label || keepLabelSpace;
  const labelPart = displayLabel ? (
    <MyFormLabel className={classes.label}>{label}</MyFormLabel>
  ) : null;

  return (
    <IconWrapper
      IconComponent={IconComponent}
      iconClassName={classes.icon}
      disabled
    >
      <FormControl fullWidth={fullWidth} className={classes.root}>
        {labelPart}
        <div
          className={clsx(classes.typo, {
            [classes.disabled]: disabled,
            [classes.content]: displayLabel,
          })}
        >
          {isNilOrEmpty(displayValue) ? (
            '-'
          ) : (
            <ul className={classes.ul}>
              {displayValueArr.map((val, ind) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={ind}>{val || '　'}</li>
              ))}
            </ul>
          )}
        </div>
      </FormControl>
    </IconWrapper>
  );
};

export default Display;
