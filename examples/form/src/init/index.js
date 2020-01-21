import { plugins } from '@mobx-json/form';
import widgetMap from './widgetMap';

function init() {
  plugins.widgetMap = widgetMap;
  plugins.validator.setMessages({}, 'zh');
}

export default init;
