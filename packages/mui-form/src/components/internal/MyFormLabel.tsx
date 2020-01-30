import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel, { FormLabelProps } from '@material-ui/core/FormLabel';

const useStyles = makeStyles({
  headerFont: {
    // default is 1rem
    fontSize: `${13 / 16}rem`,
  },
});

const MyFormLabel: React.FC<any> = ({ className, ...restProps }) => {
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
