import React from 'react';
import Grid from '@material-ui/core/Grid';

/**
 * Default responsive: xs=12
 */
function GridItem(props: any) {
  return <Grid item xs={12} {...props} />;
}

export default GridItem;
