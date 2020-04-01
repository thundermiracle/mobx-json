import { Item } from '../core/JsonFormTypes';

/**
 * return emptyItem if keyValue is not exist in items or incorrect
 *
 * emptyItem: { value: '', label: '' }
 * @param items
 * @param keyValue
 * @param keyName
 */
const getItemByKeyValue = (
  items: Item[],
  keyValue: any,
  keyName = 'value',
): Item => {
  const emptyItem: Item = { value: '', label: '' };
  if (keyValue == null || keyValue === '' || items.length === 0) {
    return emptyItem;
  }

  const targetItem = items.find((item: any) => {
    const value = item[keyName] == null ? '' : item[keyName];
    return value === keyValue || value.toString() === keyValue.toString();
  });

  // reset keyValue to '' if not exist in items
  return targetItem || emptyItem;
};

export default getItemByKeyValue;
