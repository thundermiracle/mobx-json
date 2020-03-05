import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextFieldOutlined from './TextFieldOutlined';
import MyAutocomplete from './internal/MyAutocomplete';
import { MyAutocompleteProps } from './internal/MyAutocomplete/MyAutocompleteTypes';

const useStyles = makeStyles({
  InputPropsAdjustment: {
    // default: padding: 9px
    paddingLeft: '14px !important',
  },
  inputPropsAdjustment: {
    // default: padding: 9.5px, 4px
    paddingLeft: '0px !important',
  },
});

const Autocomplete: React.FC<MyAutocompleteProps> = restProps => {
  const classes = useStyles();

  return (
    <MyAutocomplete
      {...restProps}
      TextFieldComponent={TextFieldOutlined}
      InputPropsClassName={classes.InputPropsAdjustment}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputPropsClassName={classes.inputPropsAdjustment}
    />
  );
};

export default Autocomplete;
