import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  logo: {
    width: '100%',
  },
  menuTitle: {
    height: '100%',
    padding: '10px 10px 0 10px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  titleVersion: {
    position: 'absolute',
    top: 50,
    right: 20,
    fontSize: 13,
    color: '#525252',
  },
});

const LayoutHeader = ({ packageInfo }) => {
  const classes = useStyles();

  return (
    <div className={classes.menuTitle}>
      <Link href="/">
        <div>
          <div className={classes.logo}>
            {packageInfo.name || 'next-boilerplate'}
          </div>
          <div className={classes.titleVersion}>
            v{packageInfo.version || '0.0.1'}
          </div>
        </div>
      </Link>
    </div>
  );
};

LayoutHeader.propTypes = {
  packageInfo: PropTypes.object.isRequired,
};

export default LayoutHeader;
