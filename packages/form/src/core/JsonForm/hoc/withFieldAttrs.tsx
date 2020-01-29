import React from 'react';
import { observer, IReactComponent } from 'mobx-react';

import { Field } from '../../JsonFormTypes';

export default (Component: IReactComponent): React.FC<any> => {
  const WithFieldAttrs: React.FC<Field> = ({
    attrs = { name: '' },
    settings,
    fields,
    ...restProps
  }) => {
    const { hidden, ...restAttrs } = attrs;

    return <Component {...restAttrs} {...restProps} />;
  };

  return observer(WithFieldAttrs);
};
