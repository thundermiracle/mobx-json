import React from 'react';
import { observer } from 'mobx-react';

import { JsonFormComponent } from '../../JsonFormTypes';

/**
 * Inject common attrs
 */
export default (
  Component: React.Component & React.FC,
): React.FC<JsonFormComponent> => {
  const ObserveMUIComponent = observer(Component) as any;

  const WithMobxAttrs: React.FC<JsonFormComponent> = ({
    onChange,
    settings,
    attrs = {},
    ...extraProps
  }) => {
    const innerOnChange = React.useCallback(
      (eventOrName, value) => {
        if (onChange) {
          if (typeof eventOrName === 'object') {
            // eventOrName is event
            const newVal =
              eventOrName.target.type === 'checkbox'
                ? eventOrName.target.checked
                : eventOrName.target.value;

            onChange(eventOrName.target.name, newVal);
          } else {
            // eventOrName is name
            onChange(eventOrName, value);
          }
        }
      },
      [onChange],
    );

    const { defaultValue, hidden, ...restAttrs } = attrs;
    let valueProps;
    if (!attrs.value) {
      // show defaultValue if value is null
      valueProps = { defaultValue };
    }

    return (
      <ObserveMUIComponent
        {...valueProps}
        {...restAttrs}
        {...extraProps}
        onChange={innerOnChange}
      />
    );
  };

  return observer(WithMobxAttrs);
};
