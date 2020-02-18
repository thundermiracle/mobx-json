import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';

import profileService from 'services/profileService';

const useStyles = makeStyles(theme => ({
  textIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SubmitFab = ({
  showSubmit,
  status,
  setStatus,
  submitWithCheck,
  className,
  handleSubmit,
}) => {
  const classes = useStyles();

  // const handleSubmit = React.useCallback(async () => {
  //   const submitData = submitWithCheck();
  //   if (submitData) {
  //     setStatus({ ...status, saving: true });
  //     await profileService.update(submitData.id, submitData);
  //     setStatus({ ...status, saving: false });
  //   }
  // }, [setStatus, status, submitWithCheck]);

  let submitFabPart = <span />;
  if (showSubmit) {
    submitFabPart = (
      <Fab
        variant="extended"
        size="small"
        color="secondary"
        aria-label="reload"
        className={className}
        onClick={handleSubmit}
      >
        {status.saving ? (
          'Saving...'
        ) : (
          <>
            <SaveIcon className={classes.textIcon} />
            Save Data
          </>
        )}
      </Fab>
    );
  }

  return submitFabPart;
};

export default React.memo(SubmitFab);
