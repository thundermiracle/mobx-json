import React from 'react';
import { IReactComponent } from 'mobx-react';

import GridItem from 'components/GridItem';

interface Props {
  grid?: any;
}

/**
 * Inject Grid layer(Main for material-ui/Grid)
 */
export default (MUIComponent: IReactComponent) => {
  const WithGrid = ({ grid = null, ...restProps }: Props) => {
    if (grid == null) return <MUIComponent {...restProps} />;

    return (
      <GridItem {...grid}>
        <MUIComponent {...restProps} />
      </GridItem>
    );
  };

  return WithGrid;
};
