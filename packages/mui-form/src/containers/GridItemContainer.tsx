import React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';

const GridItemContainer: React.FC<GridProps> = props => {
  return <Grid item container spacing={2} {...props} />;
};

export default GridItemContainer;
