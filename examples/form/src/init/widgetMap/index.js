import TextField from '@material-ui/core/TextField';

import { makeWidgetMap } from '@mobx-json/form';
import withMUIError from './withMUIError';
import withGridItem from './withGridItem';
import GridItemContainer from '../../client/components/GridItemContainer';

const allComponents = {
  TextField,
};
const allComponentsWidgetMap = makeWidgetMap(allComponents, [
  withGridItem,
  withMUIError,
]);

const containerComponents = {
  GridItemContainer,
};

const widgetMap = {
  ...allComponentsWidgetMap,
  ...containerComponents,
};

export default widgetMap;
