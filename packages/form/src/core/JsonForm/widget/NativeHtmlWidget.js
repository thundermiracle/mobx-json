import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class NativeHtmlWidget extends Component {
  // wrap onChange if component is not defined
  innerOnChange = e => {
    const { onChange } = this.props;
    if (onChange) onChange(e.target.name, e.target.value);
  };

  render() {
    const { attrs, settings, fields, onChange, ...restProps } = this.props;
    const MyComponent = settings.widget || 'div';

    return (
      <MyComponent {...attrs} {...restProps} onChange={this.innerOnChange} />
    );
  }
}

NativeHtmlWidget.propTypes = {
  attrs: PropTypes.object,
  settings: PropTypes.object,
  fields: PropTypes.object,
  onChange: PropTypes.func,
};

NativeHtmlWidget.defaultProps = {
  attrs: null,
  settings: {},
  fields: null,
  onChange: null,
};

export default NativeHtmlWidget;
