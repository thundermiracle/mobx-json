import React from 'react';

import TextField from './TextField';
import MyAutocomplete from './internal/MyAutocomplete';
import { MyAutocompleteProps } from './internal/MyAutocomplete/MyAutocompleteTypes';

const Autocomplete: React.FC<MyAutocompleteProps> = restProps => {
  return <MyAutocomplete {...restProps} TextFieldComponent={TextField} />;
};

export default Autocomplete;
