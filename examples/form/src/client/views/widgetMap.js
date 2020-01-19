import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';

import withGrid from '@mobx-json/form/lib/withGrid';
import makeWidgetMap from '@mobx-json/form/lib/makeWidgetMap';
import withMUIError from './withMUIError';

const allComponents = {
  TextField,
  Dialog,
};

const widgetMap = makeWidgetMap(allComponents, withGrid(Grid), withMUIError);

export default widgetMap;
