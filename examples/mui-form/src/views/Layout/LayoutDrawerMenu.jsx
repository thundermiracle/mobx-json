import React from 'react';
import PropTypes from 'prop-types';

import NextLink from 'next/link';
import DrawerMenu from './DrawerMenu';
import PATH_MAP from './MenuMap';

const LayoutDrawerMenu = ({ closeDrawer }) => {
  return (
    <DrawerMenu
      pathMap={PATH_MAP}
      linkComponent={NextLink}
      closeDrawer={closeDrawer}
    />
  );
};

LayoutDrawerMenu.propTypes = {
  closeDrawer: PropTypes.func,
};

LayoutDrawerMenu.defaultProps = {
  closeDrawer: null,
};

export default LayoutDrawerMenu;
