import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { JsonFormTypes } from '@mobx-json/form';
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
  store: JsonFormTypes.JsonFormStore;
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

  /**
   * reset error status if store changed
   */
  componentDidUpdate(prevProps: MsgErrorBoundaryProps): void {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.store !== this.props.store) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        hasError: false,
      });
    }
  }

  static getDerivedStateFromError(error: Error): MsgErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { msg: error.stack, hasError: true };
  }

  componentDidCatch(error: Error) {
    // You can also log the error to an error reporting service
    // console.error('MsgErrorBoundary.error:', error);
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
