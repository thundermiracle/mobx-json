import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

/**
 * Inject common attrs
 */
export default Component => {
  const ObserveMUIComponent = observer(Component);

  const WithMobxAttrs = ({ onChange, settings, attrs }) => {
    const innerOnChange = React.useCallback(
      (eventOrName, value) => {
        if (onChange) {
          if (typeof eventOrName === 'object') {
            // eventOrName is event
            onChange(eventOrName.target.name, eventOrName.target.value);
          } else {
            // eventOrName is name
            onChange(eventOrName, value);
          }
        }
      },
      [onChange],
    );

    const { defaultValue, ...restAttrs } = attrs;
    let valueProps;
    if (!attrs.value) {
      // show defaultValue if value is null
      valueProps = { defaultValue };
    }

    return (
      <ObserveMUIComponent
        {...valueProps}
        {...restAttrs}
        label={settings.hideLabel ? null : attrs.label}
        onChange={innerOnChange}
      />
    );
  };

  WithMobxAttrs.propTypes = {
    attrs: PropTypes.object.isRequired,
    settings: PropTypes.object,
    onChange: PropTypes.func,
  };

  WithMobxAttrs.defaultProps = {
    settings: null,
    onChange: null,
  };

  return observer(WithMobxAttrs);
};
