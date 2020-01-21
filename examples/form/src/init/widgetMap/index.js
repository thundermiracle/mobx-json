import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MUICheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { makeWidgetMap } from '@mobx-json/form';
import withMUIError from './withMUIError';
import withGridItem from './withGridItem';
import GridContainer from '../../client/components/GridContainer';

const CheckBox = ({
  label,
  value,
  helperText,
  error,
  fullWidth,
  ...restProps
}) => {
  return (
    <FormControlLabel
      control={<MUICheckBox checked={value} {...restProps} />}
      label={label}
    />
  );
};

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
