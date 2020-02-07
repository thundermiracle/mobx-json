import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  progress: {
    position: 'fixed',
    left: 'calc(50% - 20px)',
    top: 'calc(50% - 20px)',
  },
});

type CircularDeterminateProps = {
  interval?: number;
} & CircularProgressProps;

const CircularDeterminate: React.FC<CircularDeterminateProps> = ({
  interval = 20,
}) => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function tick(): void {
      // reset when reaching 100%
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, interval);
    return (): any => {
      clearInterval(timer);
    };
  }, [interval]);

  return (
    <CircularProgress
      className={classes.progress}
      variant="determinate"
      value={progress}
      color="secondary"
    />
  );
};

export default React.memo(CircularDeterminate);
