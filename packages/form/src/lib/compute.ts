import { sum } from 'ramda';
import { AnyObject } from '../core/JsonFormTypes';

const compute = (
  method: string,
  targetFieldsVal: AnyObject,
  extra?: string,
): number | string => {
  switch (method) {
    case 'concat':
      return Object.values(targetFieldsVal).join(extra || '');

    case 'sum':
      // return 0 if sum result is NaN
      return sum(Object.values(targetFieldsVal)) || 0;

    default:
      return '';
  }
};

export default compute;
