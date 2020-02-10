import { transduce, listCombiner, compose } from 'lib/utils';

import widget from './widget';
import hidden from './hidden';
import { Field } from '../../JsonFormTypes';

function filterFields(fields: Field[]): Field[] {
  // const filtersTrans = compose(widget, hidden);
  // oper hidden status in each component
  const filtersTrans = compose(widget);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return transduce(filtersTrans, listCombiner as any, [], fields);
}

export default filterFields;
