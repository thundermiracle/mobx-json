import React from 'react';

import TextFieldOutlined from './TextFieldOutlined';
import MyAutocomplete from './internal/MyAutocomplete';
import { MyAutocompleteProps } from './internal/MyAutocomplete/MyAutocompleteTypes';

const Autocomplete: React.FC<MyAutocompleteProps> = restProps => {
  return (
    <MyAutocomplete {...restProps} TextFieldComponent={TextFieldOutlined} />
  );
};

export default Autocomplete;
