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
      if (onChange) onChange(e.target.name, e.target.value);
    },
    [onChange],
  );

  const MyComponent = settings.widget || 'div';

  return <MyComponent {...attrs} {...restProps} onChange={innerOnChange} />;
};

export default observer(NativeHtmlWidget);
