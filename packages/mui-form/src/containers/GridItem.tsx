import React from 'react';
import { observer } from 'mobx-react';

import Grid, { GridProps } from '@material-ui/core/Grid';

/**
 * Default responsive: xs=12
 */
const GridItem: React.FC<GridProps> = ({ ...restProps }) => {
  return <Grid item xs={12} {...restProps} />;
};

export default observer(GridItem);
