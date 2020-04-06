import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { JsonForm, JsonFormStore, JsonFormTypes } from '@mobx-json/form';
import domFocusByName from 'lib/domFocusByName';
import SmoothScroll from './common/SmoothScroll';
import MsgErrorBoundary from './common/MsgErrorBoundary';

const useStyles = makeStyles({
  form: {
    width: '100%',
  },
});

interface MuiJsonFormInputOptions {
  smoothScroll?: boolean;
  gridContainerProps?: object;
}

export interface MuiJsonFormInputProps {
  blueprint: JsonFormTypes.Blueprint;
  blueprintExtra: JsonFormTypes.BlueprintExtra;
  formUniqName?: string;
  data?: object;
  options?: MuiJsonFormInputOptions;
}

type NullableBlueprint = null | JsonFormTypes.Blueprint;

export interface MuiJsonFormProps {
  form: JSX.Element;
  store: JsonFormStore;
  getDataWithCheck: () => false | object;
  setData: (data: object) => void;
  getData: () => object;
  setBlueprint: (blueprint: NullableBlueprint) => void;
  clearError: () => void;
  clearData: () => void;
  clearAll: () => void;
  revertToInit: () => void;
  changeFieldAttrs: (
    fieldName: string,
    attrName: string,
    attrValue: any,
  ) => void;
}

function useMuiJsonForm({
  blueprint,
  blueprintExtra,
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
    return new JsonFormStore(innerBlueprint || blueprint, blueprintExtra);
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

  const clearAll = React.useCallback(() => {
    store.clearAllErrors();
    store.clearAllData();
  }, [store]);

  return {
    form,
    store,
    setBlueprint,
    getDataWithCheck,
    clearAll,
    setData: store.setData,
    getData: store.getData,
    clearError: store.clearAllErrors,
    clearData: store.clearAllData,
    revertToInit: store.revertToInit,
    changeFieldAttrs: store.changeFieldAttrs,
  };
}

export default useMuiJsonForm;
