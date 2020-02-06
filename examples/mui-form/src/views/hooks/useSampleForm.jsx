/* eslint-disable react/prop-types */
import React from 'react';

import { useMuiJsonForm, LoadingOverlay } from '@mobx-json/mui-form';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';

import { makeStyles } from '@material-ui/core/styles';
import profileService from 'services/profileService';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  fabReload: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(4),
  },
  fabSave: {
    position: 'absolute',
    bottom: theme.spacing(8),
    right: theme.spacing(4),
  },
  textIcon: {
    marginRight: theme.spacing(1),
  },
}));

const useSampleForm = ({
  blueprint,
  formUniqName,
  data,
  showSubmit = true,
}) => {
  const classes = useStyles();
  const [status, setStatus] = React.useState({
    loading: false,
    saving: false,
  });
  const { form, submitWithCheck, setData } = useMuiJsonForm({
    blueprint,
    formUniqName,
    data,
  });

  const handleSubmit = React.useCallback(async () => {
    const submitData = submitWithCheck();
    if (submitData) {
      setStatus({ ...status, saving: true });
      await profileService.update(submitData.id, submitData);
      setStatus({ ...status, saving: false });
    }
  }, [status, submitWithCheck]);

  const handleReload = React.useCallback(async () => {
    setStatus({ ...status, loading: true });
    const dataFromDB = await profileService.select('user12345');
    setData(dataFromDB);

    // rerun validation
    submitWithCheck();

    setStatus({ ...status, loading: false });
  }, [setData, status, submitWithCheck]);

  React.useEffect(() => {
    handleReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let submitPart;
  if (showSubmit) {
    submitPart = (
      <Fab
        variant="extended"
        size="small"
        color="secondary"
        aria-label="reload"
        className={classes.fabSave}
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

  return (
    <LoadingOverlay loading={status.loading || status.saving}>
      <Card className={classes.root}>
        <CardContent>{form}</CardContent>
      </Card>
      {submitPart}
      <Fab
        variant="extended"
        size="small"
        color="secondary"
        aria-label="reload"
        className={classes.fabReload}
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
    </LoadingOverlay>
  );
};

export default useSampleForm;
