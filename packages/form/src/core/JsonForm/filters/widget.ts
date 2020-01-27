import { Field } from 'core/JsonFormStore/types';
import { filter } from '../lib/utils';

const widgetsNoNeedRender = ['Data'];

function widgetPredicator({ settings }: Field): boolean {
  return !widgetsNoNeedRender.includes(settings.widget);
}

export default filter(widgetPredicator);
