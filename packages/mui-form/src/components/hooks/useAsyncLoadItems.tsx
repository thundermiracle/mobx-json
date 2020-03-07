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
  items: Item[];
  setItems: (items: Item[]) => void;
  loaderSize: number;
  loaderStyle?: AnyObject;
  asyncLoadItems?: () => Promise<Item[]>;
}

interface UseAsyncLoadItemsProps {
  itemsLoading: boolean;
  loader: JSX.Element | null;
}

const useAsyncLoadItems = ({
  items,
  setItems,
  loaderSize,
  loaderStyle,
  asyncLoadItems,
}: UseAsyncLoadItemsInputProps): UseAsyncLoadItemsProps => {
  const classes = useStyles();
  const itemsLoading = items.length === 0;

  React.useEffect(() => {
    let active = true;

    // auto load only if it's in loading mode
    if (!itemsLoading || !asyncLoadItems) {
      return undefined;
    }

    (async (): Promise<void> => {
      const remoteItems = await asyncLoadItems();

      if (active) {
        // return empty array if loading failed
        setItems(Array.isArray(remoteItems) ? remoteItems : []);
      }
    })();

    return (): any => {
      active = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const loader = itemsLoading ? (
    <CircularProgress
      className={classes.loader}
      color="secondary"
      size={loaderSize}
      style={loaderStyle}
    />
  ) : null;

  return {
    itemsLoading,
    loader,
  };
};

export default useAsyncLoadItems;
