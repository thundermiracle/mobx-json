import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    width: '100%',
  },
  submit: {
    display: 'none',
  },
});

interface SubmitFormProps {
  className?: string;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  [key: string]: any;
}

const SubmitForm: React.FC<SubmitFormProps> = ({
  className,
  onSubmit,
  children,
  ...restProps
}) => {
  const classes = useStyles();

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit],
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={clsx(className, classes.form)}
      {...restProps}
    >
      <button type="submit" aria-label="submit" className={classes.submit} />
      {children}
    </form>
  );
};

export default SubmitForm;
