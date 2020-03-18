import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  textIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ClearFab = ({ showSubmit, className, handleClear }) => {
  const classes = useStyles();

  let ClearFabPart = <span />;
  if (showSubmit) {
    ClearFabPart = (
      <Fab
        variant="extended"
        size="small"
        color="secondary"
        aria-label="clear"
        className={className}
        onClick={handleClear}
      >
        <DeleteIcon className={classes.textIcon} />
        Clear Inputs
      </Fab>
    );
  }

  return ClearFabPart;
};

export default React.memo(ClearFab);
