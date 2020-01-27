import React from 'react';
import { observer, IReactComponent } from 'mobx-react';

interface FieldProps {
  settings?: any;
  attrs?: any;
  fields?: any;
}

export default (Component: IReactComponent) => {
  const WithFieldAttrs = ({
    attrs = {},
    settings,
    fields,
    ...restProps
  }: FieldProps) => {
    const { hidden, ...restAttrs } = attrs;

    return <Component {...restAttrs} {...restProps} />;
  };

  return observer(WithFieldAttrs);
};
