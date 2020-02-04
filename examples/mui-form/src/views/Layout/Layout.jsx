import React from 'react';
import PropTypes from 'prop-types';

import ResponsiveLayout from './ResponsiveLayout';
import LayoutDrawerHeader from './LayoutDrawerHeader';
import LayoutDrawerMenu from './LayoutDrawerMenu';

const Layout = props => {
  const { title, children } = props;

  const packageInfo = {
    version: '1.0.0',
    name: '@mobx-json/mui-form-example',
  };
  const layoutdrawerHeader = <LayoutDrawerHeader packageInfo={packageInfo} />;

  return (
    <ResponsiveLayout
      drawerHeader={layoutdrawerHeader}
      drawerMenu={<LayoutDrawerMenu />}
      title={title}
    >
      {children}
    </ResponsiveLayout>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

Layout.defaultProps = {
  title: '',
  children: null,
};

export default Layout;
