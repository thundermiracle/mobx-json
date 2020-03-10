import { Item } from '../components/ComponentTypes';

const parseValByItems = (originValue: any, items: Item[]): any => {
  if (originValue == null || originValue === '' || items.length === 0) {
    return '';
  }

  const itemInd = items.findIndex(({ value }) => {
    return value === originValue || value.toString() === originValue.toString();
  });

  // reset originValue to '' if not exist in items
  return itemInd > -1 ? originValue : '';
};

export default parseValByItems;
