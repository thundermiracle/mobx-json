import { Field } from 'core/JsonFormStore/types';

import { transduce, listCombiner, compose } from '../lib/utils';

import widget from './widget';
import hidden from './hidden';

function filterFields(fields: Field[]): Field[] {
  const filtersTrans = compose(widget, hidden);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return transduce(filtersTrans, listCombiner as any, [], fields);
}

export default filterFields;
