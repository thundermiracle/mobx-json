import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import { Item, AnyObject } from '../ComponentTypes';

const useStyles = makeStyles({
  loader: {
    position: 'absolute',
    bottom: 5,
  },
});

interface UseAsyncLoadItemsInputProps {
  initItems: Item[];
  loaderSize: number;
  loaderStyle?: AnyObject;
  forceLoadOnce?: object;
  asyncLoadItems?: () => Promise<Item[]>;
}

interface UseAsyncLoadItemsProps {
  items: Item[];
  loading: boolean;
  loader: JSX.Element | null;
}

const useAsyncLoadItems = ({
  initItems,
  loaderSize,
  loaderStyle,
  forceLoadOnce,
  asyncLoadItems,
}: UseAsyncLoadItemsInputProps): UseAsyncLoadItemsProps => {
  const classes = useStyles();
  const [items, setItems] = React.useState(initItems);
  const [loading, setLoading] = React.useState(items.length === 0);

  React.useEffect(() => {
    // reload once if forceLoadOnce changed
    setLoading(true);
  }, [forceLoadOnce]);

  React.useEffect(() => {
    let active = true;

    // auto load only if it's in loading mode
    if (!loading || !asyncLoadItems) {
      setLoading(false);
      return undefined;
    }

    (async (): Promise<void> => {
      const remoteItems = await asyncLoadItems();

      if (active) {
        // return empty array if loading failed
        setItems(Array.isArray(remoteItems) ? remoteItems : []);
        setLoading(false);
      }
    })();

    return (): any => {
      active = false;
    };
  }, [asyncLoadItems, loading, setItems]);

  const loader = loading ? (
    <CircularProgress
      className={classes.loader}
      color="secondary"
      size={loaderSize}
      style={loaderStyle}
    />
  ) : null;

  return {
    items,
    loading,
    loader,
  };
};

export default useAsyncLoadItems;
