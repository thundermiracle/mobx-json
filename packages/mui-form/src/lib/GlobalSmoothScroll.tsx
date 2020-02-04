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
  { name: 'MuiFormGlobalSmoothScroll' },
);

interface GlobalSmoothScrollProps {
  children?: React.ReactElement;
}

const GlobalSmoothScroll: React.ComponentType<GlobalSmoothScrollProps> = ({
  children = null,
}) => {
  useStyles();

  return <>{children}</>;
};

export default GlobalSmoothScroll;
