import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

export default Component => {
  const WithMUIError = ({ error, ...restProps }) => {
    return <Component {...restProps} error={!!error} helperText={error} />;
  };

  WithMUIError.propTypes = {
    error: PropTypes.string,
  };

  WithMUIError.defaultProps = {
    error: '',
  };

  return observer(WithMUIError);
};
