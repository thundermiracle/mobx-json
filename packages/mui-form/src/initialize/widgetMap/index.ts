import { makeWidgetMap } from '@mobx-json/form';
import * as MUIComponents from 'components';

import GridItemContainer from 'containers/GridItemContainer';

import withMUIProps from './withMUIProps';
import withGridItem from './withGridItem';

const allComponents = MUIComponents;
const allComponentsWidgetMap = makeWidgetMap(allComponents, [
  withGridItem,
  withMUIProps,
]);

const containerComponentsWidgetMap = {
  GridItemContainer,
};

const widgetMap = {
  ...allComponentsWidgetMap,
  ...containerComponentsWidgetMap,
};

export default widgetMap;
