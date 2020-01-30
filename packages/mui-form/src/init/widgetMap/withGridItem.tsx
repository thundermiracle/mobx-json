import React from 'react';

import GridItem from 'containers/GridItem';

interface WithGridProps {
  grid?: object;
  noGrid?: boolean;
}

/**
 * Inject Grid layer(Main for material-ui/Grid)
 */
export default (
  MUIComponent: React.Component & React.FC,
): React.FC<WithGridProps> => {
  const WithGrid: React.FC<WithGridProps> = ({
    noGrid = false,
    grid,
    ...restProps
  }) => {
    if (noGrid) return <MUIComponent {...restProps} />;

    return (
      <GridItem {...grid}>
        <MUIComponent {...restProps} />
      </GridItem>
    );
  };

  return WithGrid;
};
