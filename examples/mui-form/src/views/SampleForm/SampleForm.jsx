import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  useMuiJsonForm,
  LoadingOverlay,
  SubmitForm,
} from '@mobx-json/mui-form';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import profileService from 'services/profileService';

import ExpandJsonEditor from './parts/ExpandJsonEditor';
import SubmitFab from './parts/SubmitFab';
import ReloadFab from './parts/ReloadFab';
import ClearFab from './parts/ClearFab';
import RevertFab from './parts/RevertFab';

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
    bottom: theme.spacing(22),
    right: theme.spacing(4),
  },
  fabRevert: {
    position: 'fixed',
    bottom: theme.spacing(16),
    right: theme.spacing(4),
  },
  fabClear: {
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
  const {
    form,
    submitWithCheck,
    setData,
    setBlueprint,
    clearAll,
    revertToInit,
  } = useMuiJsonForm({
    blueprint,
    formUniqName,
    data,
  });

  const expandJsonEditorPart = (
    <ExpandJsonEditor blueprint={blueprint} setBlueprint={setBlueprint} />
  );

  const handleSubmit = React.useCallback(async () => {
    const submitData = submitWithCheck();
    if (submitData) {
      setStatus({ ...status, saving: true });
      await profileService.update(submitData.id, submitData);
      setStatus({ ...status, saving: false });
    }
  }, [setStatus, status, submitWithCheck]);

  // submit part
  const submitFabPart = (
    <SubmitFab
      showSubmit={showSubmit}
      status={status}
      setStatus={setStatus}
      submitWithCheck={submitWithCheck}
      className={classes.fabSave}
      handleSubmit={handleSubmit}
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

  // clear part
  const clearFabPart = (
    <ClearFab
      showSubmit={showSubmit}
      className={classes.fabClear}
      handleClear={clearAll}
    />
  );

  // revert part
  const clearRevertPart = (
    <RevertFab
      showSubmit={showSubmit}
      className={classes.fabRevert}
      handleRevert={revertToInit}
    />
  );

  return (
    <LoadingOverlay loading={status.loading || status.saving}>
      <SubmitForm onSubmit={handleSubmit}>
        {expandJsonEditorPart}
        <Card className={classes.root}>
          <CardContent>{form}</CardContent>
        </Card>
        {submitFabPart}
        {clearRevertPart}
        {clearFabPart}
        {reloadFabPart}
      </SubmitForm>
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
