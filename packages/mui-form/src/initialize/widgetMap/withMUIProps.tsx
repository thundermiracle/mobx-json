import React from 'react';
import { observer } from 'mobx-react';

interface WithMUIProps {
  error?: string;
  [key: string]: any;
}

export default (
  Component: React.Component & React.FC<any>,
): React.FC<WithMUIProps> => {
  const WithMUIError: React.FC<WithMUIProps> = ({
    error = '',
    ...restProps
  }) => {
    return (
      <Component fullWidth {...restProps} error={!!error} helperText={error} />
    );
  };

  return observer(WithMUIError);
};
