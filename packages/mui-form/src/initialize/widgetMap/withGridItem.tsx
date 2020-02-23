import React from 'react';

import GridItem from 'containers/GridItem';

interface WithGridProps {
  grid?: object;
  noGrid?: boolean;
  hidden?: boolean;
}

/**
 * Inject Grid layer(Main for material-ui/Grid)
 */
export default (
  MUIComponent: React.Component<any> & React.FC<any>,
): React.FC<WithGridProps> => {
  const WithGrid: React.FC<WithGridProps> = ({
    noGrid = false,
    grid,
    hidden,
    ...restProps
  }) => {
    if (noGrid) return <MUIComponent {...restProps} hidden={hidden} />;

    return (
      <GridItem {...grid} hidden={hidden}>
        <MUIComponent {...restProps} hidden={hidden} />
      </GridItem>
    );
  };

  return WithGrid;
};
