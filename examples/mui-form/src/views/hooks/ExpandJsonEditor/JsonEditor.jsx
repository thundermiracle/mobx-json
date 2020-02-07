import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  jsonMessage: {
    padding: 10,
    color: 'red',
    fontWeight: 'bold',
    flex: 1,
  },
  jsonPart: {
    width: '100%',
  },
  jsonTextArea: {
    width: '100%',
    height: '100%',
    resize: 'none',
    border: 'none',
    outline: 'none',
    padding: 0,
    margin: 0,
    minHeight: 400,
  },
});

const JsonEditor = ({ json, onChange, onBlur }) => {
  const classes = useStyles();

  const handleJsonTextAreaKeyDown = e => {
    // Tabキーで次のエレメントに行くのが面倒なので制御
    if (e.keyCode === 9) {
      // Tab
      e.preventDefault();
      const elem = e.target;
      const val = e.target.value;
      const pos = elem.selectionStart;

      elem.value = `${val.substr(0, pos)}${'\t'}${val.substr(pos, val.length)}`;
      elem.setSelectionRange(pos + 1, pos + 1);
    }
  };

  let messagePart;
  let textAreaStyle;
  const errorMessage = '';
  if (errorMessage != null && errorMessage !== '') {
    messagePart = (
      <span
        className={classes.jsonMessage}
      >{`ErrorMessage:${errorMessage}`}</span>
    );
    textAreaStyle = {
      height: 'calc(100% - 50px)',
    };
  }

  return (
    <div className={classes.jsonPart}>
      {messagePart}
      <textarea
        className={classes.jsonTextArea}
        spellCheck={false}
        onKeyDown={handleJsonTextAreaKeyDown}
        value={json}
        style={textAreaStyle}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Input your JSON"
        readOnly
      />
    </div>
  );
};

JsonEditor.propTypes = {
  json: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

JsonEditor.defaultProps = {
  json: '',
  onChange: null,
  onBlur: null,
};

export default React.memo(JsonEditor);
