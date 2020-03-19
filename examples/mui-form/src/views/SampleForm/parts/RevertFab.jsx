import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import HistoryIcon from '@material-ui/icons/History';

const useStyles = makeStyles(theme => ({
  textIcon: {
    marginRight: theme.spacing(1),
  },
}));

const RevertFab = ({ showSubmit, className, handleRevert }) => {
  const classes = useStyles();

  let RevertFabPart = <span />;
  if (showSubmit) {
    RevertFabPart = (
      <Fab
        variant="extended"
        size="small"
        color="secondary"
        aria-label="clear"
        className={className}
        onClick={handleRevert}
      >
        <HistoryIcon className={classes.textIcon} />
        Revert All
      </Fab>
    );
  }

  return RevertFabPart;
};

export default React.memo(RevertFab);
