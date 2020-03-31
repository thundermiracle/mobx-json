import { Item } from '../core/JsonFormTypes';

/**
 * return emptyItem if originValue is not exist in items or incorrect
 *
 * emptyItem: { value: '', label: '' }
 * @param originValue
 * @param items
 */
const getItemByValue = (originValue: any, items: Item[]): Item => {
  const emptyItem: Item = { value: '', label: '' };
  if (originValue == null || originValue === '' || items.length === 0) {
    return emptyItem;
  }

  const targetItem = items.find(({ value }) => {
    return value === originValue || value.toString() === originValue.toString();
  });

  // reset originValue to '' if not exist in items
  return targetItem || emptyItem;
};

export default getItemByValue;
