import { plugins } from '@mobx-json/form';
import widgetMap from './widgetMap';

interface InitParams {
  messages?: any;
  locale?: string;
  extraWidgetMap?: any;
  itemsSource?: any;
  iconsMap?: any;
  serviceContainer?: any;
}

function init({
  messages = {},
  locale = 'en',
  extraWidgetMap = {},
  itemsSource = {},
  iconsMap = {},
  serviceContainer = {},
}: InitParams): void {
  plugins.widgetMap = { ...widgetMap, ...extraWidgetMap };
  plugins.validator.setMessages(messages, locale);
  plugins.itemsSource = itemsSource;
  plugins.iconsMap = iconsMap;
  plugins.serviceContainer = serviceContainer;
}

export default init;
