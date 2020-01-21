import React from 'react';
import { observer } from 'mobx-react';

interface Props {
  attrs?: object;
  settings?: any;
  fields?: object;
  onChange?: Function;
}

const NativeHtmlWidget = ({
  attrs,
  settings = {},
  fields,
  onChange,
  ...restProps
}: Props) => {
  // wrap onChange if component is not defined
  const innerOnChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        const newVal =
          e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        onChange(e.target.name, newVal);
      }
    },
    [onChange],
  );

  const MyComponent = settings.widget || 'div';

  return <MyComponent {...attrs} {...restProps} onChange={innerOnChange} />;
};

export default observer(NativeHtmlWidget);
