import { filter } from 'lib/utils';
import { Field } from '../../JsonFormTypes';

function hiddenPredicator({ attrs }: Field): boolean {
  return attrs.hidden !== true;
}

export default filter(hiddenPredicator);
