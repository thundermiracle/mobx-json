import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

import { makeWidgetMap } from '@mobx-json/form';
import withMUIError from './withMUIError';
import withGridItem from './withGridItem';
import GridContainer from '../components/GridContainer';

const allComponents = {
  TextField,
  Dialog,
};
const allComponentsWidgetMap = makeWidgetMap(allComponents, [
  withGridItem,
  withMUIError,
]);

const containerComponents = {
  GridContainer,
};

const widgetMap = {
  ...allComponentsWidgetMap,
  ...containerComponents,
};

export default widgetMap;
