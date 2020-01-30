import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  {
    '@global': {
      html: {
        scrollBehavior: 'smooth',
      },
    },
  },
  { name: 'MuiFormSmoothScroll' },
);

interface SmoothScrollProps {
  children?: React.ReactElement;
}

const SmoothScroll: React.ComponentType<SmoothScrollProps> = ({
  children = null,
}) => {
  useStyles();

  return <>{children}</>;
};

export default SmoothScroll;
