import React from 'react';
import { observer, IReactComponent } from 'mobx-react';

interface Props {
  error?: string;
}

export default (Component: IReactComponent) => {
  const WithMUIError = ({ error = '', ...restProps }: Props) => {
    return <Component {...restProps} error={!!error} helperText={error} />;
  };

  return observer(WithMUIError);
};
