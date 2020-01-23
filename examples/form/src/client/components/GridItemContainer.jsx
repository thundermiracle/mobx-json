import React from 'react';
import Grid from '@material-ui/core/Grid';

function GridItemContainer(props) {
  return <Grid item container spacing={2} {...props} />;
}

export default GridItemContainer;
