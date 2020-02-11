import { sum } from 'ramda';
import { AnyObject } from '../core/JsonFormTypes';

const compute = (
  method: string,
  targetColsVal: AnyObject,
  extra?: string,
): number | string => {
  switch (method) {
    case 'concat':
      return Object.values(targetColsVal).join(extra || '');

    case 'sum':
      // return 0 if sum result is NaN
      return sum(Object.values(targetColsVal)) || 0;

    default:
      return '';
  }
};

export default compute;
