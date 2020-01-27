import { Field } from 'core/JsonFormStore/types';
import { filter } from '../lib/utils';

function hiddenPredicator({ attrs }: Field): boolean {
  return attrs.hidden !== true;
}

export default filter(hiddenPredicator);
