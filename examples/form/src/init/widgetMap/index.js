import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

import { makeWidgetMap } from '@mobx-json/form';
import CheckBox from './CheckBox';
import withMUIError from './withMUIError';
import withGridItem from './withGridItem';
import GridItemContainer from '../../client/components/GridItemContainer';

const allComponents = {
  TextField,
  Dialog,
  CheckBox,
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
