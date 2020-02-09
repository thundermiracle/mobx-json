import React from 'react';
import { observer } from 'mobx-react';

import { Field } from '../../JsonFormTypes';

export default (Component: React.Component & React.FC): React.FC<Field> => {
  const WithFieldAttrs: React.FC<Field> = ({
    attrs = { name: '' },
    settings,
    fields,
    ...restProps
  }) => {
    return <Component {...attrs} {...restProps} />;
  };

  return observer(WithFieldAttrs);
};
