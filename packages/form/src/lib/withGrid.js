import React from 'react';
import PropTypes from 'prop-types';

const defaultGridItemProps = {
  xs: 12,
  item: true,
};

/**
 * Inject Grid layer(Main for material-ui/Grid)
 */
export default GridComponent => MUIComponent => {
  const WithGrid = props => {
    const { grid, ...restProps } = props;

    if (grid == null) return <MUIComponent {...restProps} />;

    return (
      <GridComponent {...defaultGridItemProps} {...grid}>
        <MUIComponent {...restProps} />
      </GridComponent>
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
