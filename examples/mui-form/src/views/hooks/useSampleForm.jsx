/* eslint-disable react/prop-types */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useMuiJsonForm, LoadingOverlay } from '@mobx-json/mui-form';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ExpandJsonEditor from './ExpandJsonEditor';
import SubmitFab from './SubmitFab';
import ReloadFab from './ReloadFab';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
    boxShadow:
      '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 0, 0,.4)',
  },
  fabJson: {
    position: 'fixed',
    bottom: theme.spacing(16),
    right: theme.spacing(4),
  },
  fabSave: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(4),
  },
  fabReload: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
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
  const { form, submitWithCheck, setData, setBlueprint } = useMuiJsonForm({
    blueprint,
    formUniqName,
    data,
  });

  const expandJsonEditorPart = (
    <ExpandJsonEditor blueprint={blueprint} setBlueprint={setBlueprint} />
  );

  // submit part
  const submitFabPart = (
    <SubmitFab
      showSubmit={showSubmit}
      status={status}
      setStatus={setStatus}
      submitWithCheck={submitWithCheck}
      className={classes.fabSave}
    />
  );

  // reload part
  const reloadFabPart = (
    <ReloadFab
      status={status}
      setStatus={setStatus}
      setData={setData}
      submitWithCheck={submitWithCheck}
      className={classes.fabReload}
    />
  );

  return (
    <LoadingOverlay loading={status.loading || status.saving}>
      {expandJsonEditorPart}
      <Card className={classes.root}>
        <CardContent>{form}</CardContent>
      </Card>
      {submitFabPart}
      {reloadFabPart}
    </LoadingOverlay>
  );
};

export default useSampleForm;
