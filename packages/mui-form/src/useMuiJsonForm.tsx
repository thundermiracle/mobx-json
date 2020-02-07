import React from 'react';

import { Grid } from '@material-ui/core';
import { JsonForm, JsonFormStore, JsonFormTypes } from '@mobx-json/form';
import domFocusByName from 'lib/domFocusByName';
import SmoothScroll from './common/SmoothScroll';
import MsgErrorBoundary from './common/MsgErrorBoundary';
import { AnyObject } from './components/ComponentTypes';

interface MuiJsonFormInputOptions {
  smoothScroll?: boolean;
  gridProps?: AnyObject;
}

export interface MuiJsonFormInputProps {
  blueprint: JsonFormTypes.Blueprint;
  formUniqName?: string;
  data?: AnyObject;
  options?: MuiJsonFormInputOptions;
}

export interface MuiJsonFormProps {
  form: JSX.Element;
  submitWithCheck: () => false | JsonFormTypes.AnyObject;
  setData: (data: AnyObject) => void;
  setBlueprint: (blueprint: JsonFormTypes.Blueprint) => void;
}

function useMuiJsonForm({
  blueprint,
  formUniqName,
  data,
  options = {},
}: MuiJsonFormInputProps): MuiJsonFormProps {
  const { smoothScroll = true, gridProps } = options;

  // if (!formUniqName) {
  //   throw new Error('formUniqName must be defined.');
  // }

  // initilize mobx store
  const store = React.useMemo(() => {
    return new JsonFormStore(blueprint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formUniqName || blueprint]);

  // load default data only once
  React.useEffect(() => {
    store.setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = React.useMemo(
    () => (
      <>
        {smoothScroll ? <SmoothScroll /> : null}
        <MsgErrorBoundary>
          <Grid container spacing={2} {...gridProps}>
            <form name={formUniqName} noValidate>
              <JsonForm store={store} />
            </form>
          </Grid>
        </MsgErrorBoundary>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formUniqName, gridProps, smoothScroll, blueprint, store.fields],
  );

  const setData = React.useCallback(
    (dt: AnyObject) => {
      store.setData(dt);
    },
    [store],
  );

  const submitWithCheck = React.useCallback(() => {
    if (store.checkAllOnSubmit()) {
      return store.getData();
    }

    const errFieldName = store.getFirstErrFieldName();
    if (errFieldName != null) {
      domFocusByName(errFieldName, formUniqName);
      // domFocusByName(errFieldName);
    }

    return false;
  }, [formUniqName, store]);

  const setBlueprint = React.useCallback(
    (blueprintObj: JsonFormTypes.Blueprint) => {
      store.initFieldsByJsonBlueprint(blueprintObj);
    },
    [store],
  );

  return {
    form,
    submitWithCheck,
    setData,
    setBlueprint,
  };
}

export default useMuiJsonForm;
