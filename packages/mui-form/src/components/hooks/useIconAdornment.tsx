import * as React from 'react';

import { InputAdornment } from '@material-ui/core';
import { AdornmentPosition } from '../TextField';

interface TextFieldInputProps {
  startAdornment?: any;
  endAdornment?: any;
}

interface UseIconAdornment {
  adornment?: any;
  adornmentPosition?: AdornmentPosition;
  IconComponent?: any;
}

const useIconAdornment = ({
  adornment,
  adornmentPosition = AdornmentPosition.end,
  IconComponent,
}: UseIconAdornment): TextFieldInputProps => {
  const InputProps: TextFieldInputProps = {};
  if (adornment) {
    switch (adornmentPosition) {
      case AdornmentPosition.start:
        InputProps.startAdornment = (
          <InputAdornment position="start">{adornment}</InputAdornment>
        );
        break;
      case AdornmentPosition.end:
      default:
        InputProps.endAdornment = (
          <InputAdornment position="end">{adornment}</InputAdornment>
        );
        break;
    }
  }

  if (IconComponent) {
    // override start adornment
    InputProps.startAdornment = (
      <InputAdornment position="start">
        <IconComponent />
      </InputAdornment>
    );
  }

  return InputProps;
};

export default useIconAdornment;
