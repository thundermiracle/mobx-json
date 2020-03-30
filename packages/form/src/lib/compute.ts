import { toJS } from 'mobx';
import { sum } from 'ramda';
import { AnyObject, Format } from '../core/JsonFormTypes';
import formatter from './formatter';

const compute = (
  method: string,
  targetFieldsVal: AnyObject,
  extra?: string,
  format?: Format,
): number | string => {
  switch (method) {
    case 'concat':
      return Object.values(targetFieldsVal).join(extra || '');

    case 'sum':
      // return 0 if sum result is NaN
      return sum(Object.values(targetFieldsVal)) || 0;

    case 'format':
      if (format == null) {
        throw new Error(
          'format MUST be defined in settings when use format in computeRule',
        );
      }
      return formatter(
        Object.values(targetFieldsVal)[0],
        format.type,
        format.template || toJS(format.items), // type:'items' needs format.items
      );

    default:
      return '';
  }
};

export default compute;
