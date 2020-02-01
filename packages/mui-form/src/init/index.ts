import { plugins } from '@mobx-json/form';
import widgetMap from './widgetMap';

interface InitParams {
  messages?: any;
  locale?: string;
  extraWidgetMap?: any;
  itemsSource?: any;
  iconsMap?: any;
}

function init({
  messages = {},
  locale = 'en',
  extraWidgetMap = {},
  itemsSource = {},
  iconsMap = {},
}: InitParams): void {
  plugins.widgetMap = { ...widgetMap, ...extraWidgetMap };
  plugins.validator.setMessages(messages, locale);
  plugins.itemsSource = itemsSource;
  plugins.iconsMap = iconsMap;
}

export default init;
