import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

import { makeWidgetMap } from '@mobx-json/form';
import CheckBox from 'components/CheckBox';
import GridContainer from 'components/GridContainer';
import withMUIError from './withMUIError';
import withGridItem from './withGridItem';

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
  GridContainer,
};

const widgetMap = {
  ...allComponentsWidgetMap,
  ...containerComponents,
};

export default widgetMap;
