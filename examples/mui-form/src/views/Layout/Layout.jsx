import React from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import ResponsiveLayout from './ResponsiveLayout';
import LayoutDrawerHeader from './LayoutDrawerHeader';
import LayoutDrawerMenu from './LayoutDrawerMenu';

const Layout = props => {
  const { children } = props;
  const router = useRouter();

  const packageInfo = {
    version: '1.0.0',
    name: '@mobx-json/mui-form-example',
  };
  const layoutdrawerHeader = <LayoutDrawerHeader packageInfo={packageInfo} />;

  return (
    <ResponsiveLayout
      packageInfo={packageInfo}
      drawerHeader={layoutdrawerHeader}
      drawerMenu={<LayoutDrawerMenu />}
      title={router.pathname.replace('/', '')}
    >
      {children}
    </ResponsiveLayout>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
