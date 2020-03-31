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
    init,
    attrs = {},
    ...restProps
  }) => {
    const innerOnChange = React.useCallback(
      (eventOrName, value, valueLabel) => {
        if (onChange) {
          if (typeof eventOrName === 'object') {
            // eventOrName is event
            const newVal =
              eventOrName.target.type === 'checkbox'
                ? eventOrName.target.checked
                : eventOrName.target.value;
            const newValLabel = eventOrName.target.dataset.valueLabel;

            onChange(eventOrName.target.name, newVal, newValLabel);
          } else {
            // eventOrName is name
            onChange(eventOrName, value, valueLabel);
          }
        }
      },
      [onChange],
    );

    // const { defaultValue, ...restAttrs } = attrs;
    // let valueProps;
    // if (!attrs.value) {
    //   // show defaultValue if value is null
    //   valueProps = { defaultValue };
    // }

    return (
      <ObserveMUIComponent {...attrs} {...restProps} onChange={innerOnChange} />
    );
  };

  return observer(WithMobxAttrs);
};
