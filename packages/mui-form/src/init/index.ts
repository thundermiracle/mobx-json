import { plugins } from '@mobx-json/form';
import widgetMap from './widgetMap';

interface InitParams {
  messages?: any;
  locale?: string;
  extraWidgetMap?: any;
}

function init({
  messages = {},
  locale = 'en',
  extraWidgetMap = {},
}: InitParams): void {
  plugins.widgetMap = { ...widgetMap, ...extraWidgetMap };
  plugins.validator.setMessages(messages, locale);
}

export default init;
