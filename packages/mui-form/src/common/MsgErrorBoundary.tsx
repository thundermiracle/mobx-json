import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { AnyObject } from '../components/ComponentTypes';

const styles = {
  errorArea: {
    padding: 20,
    height: 'calc(100% - 40px)',
    width: 'calc(100% - 40px)',
    color: 'red',
  },
};

interface MsgErrorBoundaryProps {
  classes: AnyObject;
}

interface MsgErrorBoundaryState {
  hasError: boolean;
  msg?: string;
}

class MsgErrorBoundary extends React.PureComponent<
  MsgErrorBoundaryProps,
  MsgErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      msg: '',
    };
  }

  static getDerivedStateFromError(error: Error): MsgErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { msg: error.stack, hasError: true };
  }

  componentDidCatch(error: Error) {
    // You can also log the error to an error reporting service
    console.error('MsgErrorBoundary.error:', error);
  }

  render() {
    const { classes, children } = this.props;
    const { hasError, msg } = this.state;

    if (hasError) {
      return <div className={classes.errorArea}>{msg}</div>;
    }
    return children;
  }
}

export default withStyles(styles)(MsgErrorBoundary);
