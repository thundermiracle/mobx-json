import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { useMuiJsonForm, LoadingOverlay } from '@mobx-json/mui-form';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import ExpandJsonEditor from './parts/ExpandJsonEditor';
import SubmitFab from './parts/SubmitFab';
import ReloadFab from './parts/ReloadFab';

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

const SampleForm = ({ blueprint, formUniqName, data, showSubmit }) => {
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
      <Grid container spacing={4}>
        <Grid item xs={3}>
          {expandJsonEditorPart}
        </Grid>
        <Grid item xs={9}>
          <Card className={classes.root}>
            <CardContent>{form}</CardContent>
          </Card>
        </Grid>
      </Grid>
      {submitFabPart}
      {reloadFabPart}
    </LoadingOverlay>
  );
};

SampleForm.propTypes = {
  blueprint: PropTypes.object.isRequired,
  formUniqName: PropTypes.string,
  data: PropTypes.object,
  showSubmit: PropTypes.bool,
};

SampleForm.defaultProps = {
  formUniqName: null,
  data: null,
  showSubmit: true,
};

export default React.memo(SampleForm);
