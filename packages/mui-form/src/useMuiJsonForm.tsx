import React from 'react';
import { JsonForm, JsonFormStore, JsonFormTypes } from '@mobx-json/form';
import domFocusByName from 'lib/domFocusByName';
import SmoothScroll from 'lib/SmoothScroll';

interface MuiJsonFormInputOptions {
  smoothScroll?: boolean;
}

export interface MuiJsonFormInputProps {
  blueprint: any;
  data?: any;
  options?: MuiJsonFormInputOptions;
}

export interface MuiJsonFormProps {
  form: JSX.Element;
  submitWithCheck: () => false | JsonFormTypes.AnyObject;
}

function useMuiJsonForm({
  blueprint,
  data,
  options = { smoothScroll: true },
}: MuiJsonFormInputProps): MuiJsonFormProps {
  const { smoothScroll } = options;

  // initilize mobx store
  const store = React.useMemo(() => {
    return new JsonFormStore(blueprint);
  }, [blueprint]);
  store.setData(data);

  const form = (
    <>
      {smoothScroll ? <SmoothScroll /> : null}
      <JsonForm store={store} />
    </>
  );

  const submitWithCheck = React.useCallback(() => {
    if (store.checkAllOnSubmit()) {
      return store.getData();
    }

    const errFieldName = store.getFirstErrFieldName();
    if (errFieldName != null) {
      domFocusByName(errFieldName);
    }

    return false;
  }, [store]);

  return {
    form,
    submitWithCheck,
  };
}

export default useMuiJsonForm;
