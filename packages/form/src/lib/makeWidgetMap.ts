import { compose } from './utils';
import { AnyObject } from '../core/JsonFormTypes';

const makeWidgetMap = (
  allComponentsMap: AnyObject,
  hocs: Function[] = [],
): AnyObject => {
  if (!hocs || hocs.length === 0) {
    // return original mapping if hocs is not defined
    return allComponentsMap;
  }

  const mixedHoc = compose(...hocs);

  const innerWidgetMap: any = {};
  Object.keys(allComponentsMap).forEach(name => {
    if (typeof name !== 'string') return;

    const Component = allComponentsMap[name];
    if (hocs) {
      innerWidgetMap[name] = mixedHoc(Component);
    }
  });
  return innerWidgetMap;
};

export default makeWidgetMap;
