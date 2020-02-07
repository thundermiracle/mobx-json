import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import JsonEditor from './JsonEditor';

const useStyles = makeStyles({
  root: {
    marginBottom: 8,
    background: '#ddd',
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
      try {
        const result = JSON.parse(newJsonStr);

        setBlueprint(result);
      } catch (err) {
        setErrMsg(err.message);
      }
    },
    [setBlueprint],
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
      <ExpansionPanelDetails>
        <JsonEditor onChange={handleChange} json={json} errMsg={errMsg} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

ExpandJsonEditor.propTypes = {
  blueprint: PropTypes.object.isRequired,
  setBlueprint: PropTypes.func.isRequired,
};

export default ExpandJsonEditor;
