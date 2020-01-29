import { filter } from 'lib/utils';
import { Field } from '../../JsonFormTypes';

const widgetsNoNeedRender = ['Data'];

function widgetPredicator({ settings }: Field): boolean {
  return !widgetsNoNeedRender.includes(settings.widget);
}

export default filter(widgetPredicator);
