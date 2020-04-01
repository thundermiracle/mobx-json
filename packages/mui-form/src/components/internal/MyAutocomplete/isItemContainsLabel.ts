import { Item } from '../../ComponentTypes';

const isItemContainsLabel = (items?: Item[]): boolean => {
  if (items == null || items.length === 0) {
    return false;
  }

  const [firstItem] = items;

  return firstItem.label != null;
};

export default isItemContainsLabel;
