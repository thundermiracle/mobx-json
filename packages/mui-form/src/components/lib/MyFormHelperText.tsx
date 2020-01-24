import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FieldProps } from '../types';

const useStyles = makeStyles({
  lowMargin: {
    // default is 8px
    marginTop: 1,
  },
});

const MyFormLabel = ({ className, ...restProps }: FieldProps): JSX.Element => {
  const classes = useStyles();

  return (
    <FormHelperText
      className={clsx(classes.lowMargin, className)}
      {...restProps}
    />
  );
};

export default MyFormLabel;
