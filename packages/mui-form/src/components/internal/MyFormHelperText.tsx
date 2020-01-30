import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';

const useStyles = makeStyles({
  lowMargin: {
    // default is 8px
    marginTop: 1,
  },
});

const MyFormHelperText: React.FC<FormHelperTextProps> = ({
  className,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <FormHelperText
      className={clsx(classes.lowMargin, className)}
      {...restProps}
    />
  );
};

export default MyFormHelperText;
