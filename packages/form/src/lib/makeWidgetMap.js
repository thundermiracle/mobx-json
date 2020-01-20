import { compose } from 'ramda';

const makeWidgetMap = (allComponents, hocs = []) => {
  if (!hocs || hocs.length === 0) {
    // return original mapping if hocs is not defined
    return allComponents;
  }

  const mixedHoc = compose(...hocs);

  const innerWidgetMap = {};
  Object.keys(allComponents).forEach(name => {
    if (typeof name !== 'string') return;

    const Component = allComponents[name];
    if (hocs) {
      innerWidgetMap[name] = mixedHoc(Component);
    }
  });
  return innerWidgetMap;
};

export default makeWidgetMap;
