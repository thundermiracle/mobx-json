import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';

import { FieldProps } from '../ComponentTypes';

const useStyles = makeStyles({
  headerFont: {
    // default is 1rem
    fontSize: `${13 / 16}rem`,
  },
});

const MyFormLabel = ({ className, ...restProps }: FieldProps): JSX.Element => {
  const classes = useStyles();

  return (
    <FormLabel
      component="legend"
      className={clsx(classes.headerFont, className)}
      {...restProps}
    />
  );
};

export default MyFormLabel;
