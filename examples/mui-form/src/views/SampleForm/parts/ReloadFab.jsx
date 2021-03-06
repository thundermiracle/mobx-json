import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ReplayIcon from '@material-ui/icons/Replay';

import profileService from 'services/profileService';

const useStyles = makeStyles(theme => ({
  textIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ReloadFab = ({ status, setStatus, setData, className }) => {
  const classes = useStyles();
  const [unmount, setUnmount] = React.useState(false);

  const handleReload = React.useCallback(async () => {
    setStatus({ ...status, loading: true });
    const dataFromDB = await profileService.select('user12345');
    if (!unmount) {
      setData(dataFromDB);
    }

    setStatus({ ...status, loading: false });
  }, [setData, setStatus, status, unmount]);

  React.useEffect(() => {
    handleReload();
    return () => {
      setUnmount(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fab
      variant="extended"
      size="small"
      color="secondary"
      aria-label="reload"
      className={className}
      onClick={handleReload}
    >
      {status.loading ? (
        'Loading...'
      ) : (
        <>
          <ReplayIcon className={classes.textIcon} />
          Load Data
        </>
      )}
    </Fab>
  );
};

ReloadFab.propTypes = {
  status: PropTypes.object.isRequired,
  setStatus: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ReloadFab.defaultProps = {
  className: null,
};

export default React.memo(ReloadFab);
