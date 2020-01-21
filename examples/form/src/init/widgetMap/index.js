import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

import { makeWidgetMap } from '@mobx-json/form';
import CheckBox from './CheckBox';
import withMUIError from './withMUIError';
import withGridItem from './withGridItem';
import GridContainer from '../../client/components/GridContainer';

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
