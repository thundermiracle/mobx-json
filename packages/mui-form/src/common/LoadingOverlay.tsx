import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularDeterminate from './CircularDeterminate';

const useStyles = makeStyles({
  spinnerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1000,
    background: '#ddd',
    opacity: 0.8,
    cursor: 'progress',
  },
});

interface LoadingOverlayProps {
  loading?: boolean;
  children?: any;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading = false,
  children,
}) => {
  const classes = useStyles();

  const spinnerPart = loading ? (
    <div className={classes.spinnerWrapper}>
      <CircularDeterminate />
    </div>
  ) : null;

  return (
    <>
      {spinnerPart}
      {children}
    </>
  );
};

export default LoadingOverlay;
