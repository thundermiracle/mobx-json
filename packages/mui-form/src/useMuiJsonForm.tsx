import React from 'react';
import { JsonForm, JsonFormStore, JsonFormTypes } from '@mobx-json/form';

export interface MuiJsonFormInputProps {
  blueprint: any;
  data?: any;
}

export interface MuiJsonFormProps {
  form: JSX.Element;
  submitWithCheck: () => false | JsonFormTypes.AnyObject;
}

function useMuiJsonForm({
  blueprint,
  data,
}: MuiJsonFormInputProps): MuiJsonFormProps {
  // initilize mobx store
  const store = React.useMemo(() => {
    return new JsonFormStore(blueprint);
  }, [blueprint]);
  store.setData(data);

  const form = <JsonForm store={store} />;

  const submitWithCheck = React.useCallback(() => {
    if (store.checkAllOnSubmit()) {
      return store.getData();
    }

    return false;
  }, [store]);

  return {
    form,
    submitWithCheck,
  };
}

export default useMuiJsonForm;
