import { plugins } from '@mobx-json/form';
import widgetMap from './widgetMap';

interface InitParams {
  messages?: any;
  locale?: string;
  extraWidgetMap?: any;
  itemsSource?: any;
}

function init({
  messages = {},
  locale = 'en',
  extraWidgetMap = {},
  itemsSource = {},
}: InitParams): void {
  plugins.widgetMap = { ...widgetMap, ...extraWidgetMap };
  plugins.validator.setMessages(messages, locale);
  plugins.itemsSource = itemsSource;
}

export default init;
