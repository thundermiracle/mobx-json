import React from 'react';
import PropTypes from 'prop-types';

import GridItem from '../components/GridItem';

/**
 * Inject Grid layer(Main for material-ui/Grid)
 */
export default MUIComponent => {
  const WithGrid = props => {
    const { grid, ...restProps } = props;

    if (grid == null) return <MUIComponent {...restProps} />;

    return (
      <GridItem {...grid}>
        <MUIComponent {...restProps} />
      </GridItem>
    );
  };

  WithGrid.propTypes = {
    grid: PropTypes.object,
  };

  WithGrid.defaultProps = {
    grid: null,
  };

  return WithGrid;
};
