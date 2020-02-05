import React from 'react';
import PropTypes from 'prop-types';

import NProgress from 'nprogress';
import Router from 'next/router';

import { makeStyles } from '@material-ui/core';

// Disaply a progress bar between route transitions
NProgress.configure({
  template: `
    <div class="bar" role="bar">
      <dt></dt>
      <dd></dd>
    </div>
  `,
  showSpinner: true,
});

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const useStyles = makeStyles(theme => ({
  '@global': {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        position: 'fixed',
        background:
          theme.palette.type === 'light'
            ? theme.palette.common.black
            : theme.palette.common.white,
        borderRadius: 1,
        zIndex: theme.zIndex.tooltip,
        top: 0,
        left: 0,
        width: '100%',
        height: 3,
      },
      '& dd, & dt': {
        position: 'absolute',
        top: 0,
        height: 3,
        boxShadow: `${
          theme.palette.type === 'light'
            ? theme.palette.common.black
            : theme.palette.common.white
        } 1px 0 6px 1px`,
        borderRadius: '100%',
        animation: 'nprogress-pulse 2s ease-out 0s infinite',
      },
      '& dd': {
        opacity: 0.6,
        width: 20,
        right: 0,
        clip: 'rect(-6px,22px,14px,10px)',
      },
      '& dt': {
        opacity: 0.6,
        width: 180,
        right: -80,
        clip: 'rect(-6px,90px,14px,-6px)',
      },
    },
    '@keyframes nprogress-pulse': {
      '30%': {
        opacity: 0.6,
      },
      '60%': {
        opacity: 0,
      },
      to: {
        opacity: 0.6,
      },
    },
  },
}));

const NextGlobalProgressBar = ({ children }) => {
  useStyles();

  return <>{children}</>;
};

NextGlobalProgressBar.propTypes = {
  children: PropTypes.node,
};

NextGlobalProgressBar.defaultProps = {
  children: null,
};

export default NextGlobalProgressBar;
