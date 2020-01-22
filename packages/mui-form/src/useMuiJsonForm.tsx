import React from 'react';
import { JsonForm, JsonFormStore } from '@mobx-json/form';

interface MuiJsonFormProps {
  blueprint: any;
  data?: any;
}

function useMuiJsonForm({ blueprint, data }: MuiJsonFormProps) {
  // initilize mobx store
  const store = React.useMemo(() => {
    return new JsonFormStore(blueprint);
  }, [blueprint]);
  store.setData(data);

  const form = <JsonForm store={store} />;

  const onSubmit = React.useCallback(() => {
    if (store.checkAllOnSubmit()) {
      return store.getData();
    }

    return false;
  }, [store]);

  return {
    form,
    onSubmit,
  };
}

export default useMuiJsonForm;
