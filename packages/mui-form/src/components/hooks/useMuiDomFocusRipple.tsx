import React from 'react';

/**
 * SIDE_EFFECT: click label will trigger ripple effect!!
 */
function useMuiDomFocusRipple() {
  // https://material-ui.com/api/button-base/#props
  const action: any = React.useRef();

  // enable ripple effect when focused by calling dom.focus() or ref.current.focus()
  const onFocus = React.useCallback(() => {
    if (action.current && action.current.focusVisible) {
      action.current.focusVisible();
    }
  }, []);

  return { action, onFocus };
}

export default useMuiDomFocusRipple;
