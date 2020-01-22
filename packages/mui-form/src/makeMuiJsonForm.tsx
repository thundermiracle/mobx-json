import React from 'react';
import { JsonForm, JsonFormStore } from '@mobx-json/form';

interface MuiJsonFormProps {
  blueprint: any;
  data?: any;
}

function makeMuiJsonForm({ blueprint, data }: MuiJsonFormProps) {
  // initilize mobx store
  const store = new JsonFormStore(blueprint);
  store.setData(data);

  const form = <JsonForm store={store} />;

  const onSubmit = () => {
    if (store.checkAllOnSubmit()) {
      return store.getData();
    }

    return false;
  };

  return {
    form,
    onSubmit,
  };
}

export default makeMuiJsonForm;
