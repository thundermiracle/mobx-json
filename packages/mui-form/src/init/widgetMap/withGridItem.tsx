import React from 'react';
import { IReactComponent } from 'mobx-react';

import GridItem from 'containers/GridItem';

interface Props {
  grid?: object;
  noGrid?: boolean;
}

/**
 * Inject Grid layer(Main for material-ui/Grid)
 */
export default (MUIComponent: IReactComponent) => {
  const WithGrid = ({ noGrid = false, grid, ...restProps }: Props) => {
    if (noGrid) return <MUIComponent {...restProps} />;

    return (
      <GridItem {...grid}>
        <MUIComponent {...restProps} />
      </GridItem>
    );
  };

  return WithGrid;
};
