import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { JsonForm, JsonFormStore, JsonFormTypes } from '@mobx-json/form';
import domFocusByName from 'lib/domFocusByName';
import SmoothScroll from './common/SmoothScroll';
import MsgErrorBoundary from './common/MsgErrorBoundary';
import { AnyObject } from './components/ComponentTypes';

const useStyles = makeStyles({
  form: {
    width: '100%',
  },
});

interface MuiJsonFormInputOptions {
  smoothScroll?: boolean;
  gridContainerProps?: AnyObject;
}

export interface MuiJsonFormInputProps {
  blueprint: JsonFormTypes.Blueprint;
  formUniqName?: string;
  data?: AnyObject;
  options?: MuiJsonFormInputOptions;
}

type NullableBlueprint = null | JsonFormTypes.Blueprint;

export interface MuiJsonFormProps {
  form: JSX.Element;
  getDataWithCheck: () => false | object;
  setData: (data: object) => void;
  getData: () => object;
  setBlueprint: (blueprint: NullableBlueprint) => void;
  clearError: () => void;
  clearData: () => void;
  clearAll: () => void;
  revertToInit: () => void;
}

function useMuiJsonForm({
  blueprint,
  formUniqName,
  data,
  options = {},
}: MuiJsonFormInputProps): MuiJsonFormProps {
  const { smoothScroll = true, gridContainerProps } = options;
  const classes = useStyles();

  // change of innerBlueprint will re-render all components
  const [innerBlueprint, setBlueprint] = React.useState<NullableBlueprint>(
    null,
  );

  // if (!formUniqName) {
  //   throw new Error('formUniqName must be defined.');
  // }

  // initialize mobx store
  const store = React.useMemo(() => {
    return new JsonFormStore(innerBlueprint || blueprint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerBlueprint, formUniqName || blueprint]);

  // load default data only once
  React.useEffect(() => {
    store.setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  const form = React.useMemo(
    () => (
      <>
        {smoothScroll ? <SmoothScroll /> : null}
        {/* pass store to trigger re-render after store changed */}
        <MsgErrorBoundary store={store}>
          <div aria-label={formUniqName} className={classes.form}>
            <Grid container spacing={2} {...gridContainerProps}>
              <JsonForm store={store} />
            </Grid>
          </div>
        </MsgErrorBoundary>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formUniqName, gridContainerProps, smoothScroll, blueprint, store],
  );

  const setData = React.useCallback(
    (dt: object) => {
      store.setData(dt);
    },
    [store],
  );

  const getData = React.useCallback(() => {
    return store.getData();
  }, [store]);

  const getDataWithCheck = React.useCallback(() => {
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

  const clearError = React.useCallback(() => {
    store.clearAllErrors();
  }, [store]);

  const clearData = React.useCallback(() => {
    store.clearAllData();
  }, [store]);

  const clearAll = React.useCallback(() => {
    store.clearAllErrors();
    store.clearAllData();
  }, [store]);

  const revertToInit = React.useCallback(() => {
    store.revertToInit();
  }, [store]);

  return {
    form,
    setData,
    getData,
    getDataWithCheck,
    setBlueprint,
    clearError,
    clearData,
    clearAll,
    revertToInit,
  };
}

export default useMuiJsonForm;
