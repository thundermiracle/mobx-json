import React from 'react';
import { observer } from 'mobx-react';

import { JsonFormComponent } from '../../JsonFormTypes';

const NativeHtmlWidget: React.FC<JsonFormComponent> = ({
  attrs,
  settings = {},
  fields,
  onChange,
  ...restProps
}) => {
  // wrap onChange if component is not defined
  const innerOnChange = React.useCallback(
    e => {
      if (onChange) {
        const newVal =
          e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        onChange(e.target.name, newVal);
      }
    },
    [onChange],
  );

  const MyComponent: any = settings.widget || 'div';

  return <MyComponent {...attrs} {...restProps} onChange={innerOnChange} />;
};

export default observer(NativeHtmlWidget);
