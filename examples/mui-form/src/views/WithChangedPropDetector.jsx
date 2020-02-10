/* eslint-disable react/no-deprecated */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

export default WrappedComponent => {
  return class ChangedPropDetector extends Component {
    componentWillReceiveProps(nextProps) {
      Object.keys(nextProps)
        .filter(key => nextProps[key] !== this.props[key])
        .forEach(key => {
          console.info(
            'changed property:',
            key,
            'from',
            this.props[key],
            'to',
            nextProps[key],
          );
        });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
