import React from 'react';

import NextLink from 'next/link';
import DrawerMenu from './DrawerMenu';
import PATH_MAP from './MenuMap';

const LayoutDrawerMenu = () => {
  return <DrawerMenu pathMap={PATH_MAP} linkComponent={NextLink} />;
};

export default LayoutDrawerMenu;
