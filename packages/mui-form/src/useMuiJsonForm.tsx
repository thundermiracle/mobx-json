import React from 'react';

import { Grid } from '@material-ui/core';
import { JsonForm, JsonFormStore, JsonFormTypes } from '@mobx-json/form';
import domFocusByName from 'lib/domFocusByName';
import SmoothScroll from 'lib/SmoothScroll';
import { AnyObject } from './components/ComponentTypes';

interface MuiJsonFormInputOptions {
  smoothScroll?: boolean;
  gridProps?: AnyObject;
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
  options = {},
}: MuiJsonFormInputProps): MuiJsonFormProps {
  const { smoothScroll = true, gridProps } = options;

  // initilize mobx store
  const store = React.useMemo(() => {
    return new JsonFormStore(blueprint);
  }, [blueprint]);
  store.setData(data);

  const form = (
    <>
      {smoothScroll ? <SmoothScroll /> : null}
      <Grid container spacing={2} {...gridProps}>
        <JsonForm store={store} />
      </Grid>
    </>
  );

  const submitWithCheck = React.useCallback(() => {
    if (store.checkAllOnSubmit()) {
      return store.getData();
    }

    const errFieldName = store.getFirstErrFieldName();
    if (errFieldName != null) {
      // domFocusByName(errFieldName, store.FormId);
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
