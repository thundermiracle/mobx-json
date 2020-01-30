import React from 'react';
import { JsonForm, JsonFormStore, JsonFormTypes } from '@mobx-json/form';

import { MuiJsonFormInputProps, MuiJsonFormProps } from './useMuiJsonForm';

function makeMuiJsonForm({
  blueprint,
  data,
}: MuiJsonFormInputProps): MuiJsonFormProps {
  // initilize mobx store
  const store = new JsonFormStore(blueprint);
  store.setData(data);

  const form = <JsonForm store={store} />;

  const submitWithCheck = (): false | JsonFormTypes.AnyObject => {
    if (store.checkAllOnSubmit()) {
      return store.getData();
    }

    return false;
  };

  return {
    form,
    submitWithCheck,
  };
}

export default makeMuiJsonForm;
