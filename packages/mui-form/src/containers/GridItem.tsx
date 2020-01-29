import React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';

/**
 * Default responsive: xs=12
 */
const GridItem: React.FC<GridProps> = props => {
  return <Grid item xs={12} {...props} />;
};

export default GridItem;
