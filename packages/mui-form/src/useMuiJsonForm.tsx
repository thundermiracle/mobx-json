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
  submitWithCheck: () => false | JsonFormTypes.AnyObject;
  setData: (data: AnyObject) => void;
  setBlueprint: (blueprint: NullableBlueprint) => void;
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

  // initilize mobx store
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
          <Grid container spacing={2} {...gridContainerProps}>
            <form name={formUniqName} noValidate className={classes.form}>
              <JsonForm store={store} />
            </form>
          </Grid>
        </MsgErrorBoundary>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formUniqName, gridContainerProps, smoothScroll, blueprint, store],
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

  return {
    form,
    submitWithCheck,
    setData,
    setBlueprint,
  };
}

export default useMuiJsonForm;
