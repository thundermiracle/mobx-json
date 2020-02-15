import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import JsonEditor from './JsonEditor';

const useStyles = makeStyles({
  root: {
    marginBottom: 8,
    background: '#ddd',
  },
  collapse: {
    flexDirection: 'column',
  },
  divider: {
    width: '100%',
    marginTop: -24,
    marginBottom: 16,
  },
});

const ExpandJsonEditor = ({ blueprint, setBlueprint }) => {
  const classes = useStyles();
  const [json, setJson] = React.useState(JSON.stringify(blueprint, null, 2));
  const [errMsg, setErrMsg] = React.useState('');

  const handleChange = React.useCallback(
    e => {
      const newJsonStr = e.target.value;
      setJson(newJsonStr);
      setErrMsg('');
      try {
        const result = JSON.parse(newJsonStr);

        setBlueprint(result);
      } catch (err) {
        setErrMsg(err.message);
      }
    },
    [setBlueprint],
  );

  const handleBlur = React.useCallback(
    e => {
      try {
        const newJsonStr = e.target.value;
        setJson(JSON.stringify(JSON.parse(newJsonStr), null, 2));
        // eslint-disable-next-line no-empty
      } catch {}
    },
    [setJson],
  );

  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">JsonEditor</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.collapse}>
        <Divider className={classes.divider} />
        <JsonEditor
          onChange={handleChange}
          onBlur={handleBlur}
          json={json}
          errMsg={errMsg}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

ExpandJsonEditor.propTypes = {
  blueprint: PropTypes.object.isRequired,
  setBlueprint: PropTypes.func.isRequired,
};

export default React.memo(ExpandJsonEditor);
