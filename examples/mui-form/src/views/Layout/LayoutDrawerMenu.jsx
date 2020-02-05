import React from 'react';
import PropTypes from 'prop-types';

import NextLink from 'next/link';
import DrawerMenu from './DrawerMenu';
import PATH_MAP from './MenuMap';

const LayoutDrawerMenu = ({ path, closeDrawer }) => {
  return (
    <DrawerMenu
      pathMap={PATH_MAP}
      linkComponent={NextLink}
      closeDrawer={closeDrawer}
      path={path}
    />
  );
};

LayoutDrawerMenu.propTypes = {
  closeDrawer: PropTypes.func,
  path: PropTypes.string,
};

LayoutDrawerMenu.defaultProps = {
  closeDrawer: null,
  path: null,
};

export default LayoutDrawerMenu;
