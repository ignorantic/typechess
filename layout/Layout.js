// import libs
import React from 'react';
import PropTypes from 'prop-types';

// import components
import PublicLayout from './Public';

// import resources
import useGlobalStyles from '../assets/jss/global';

const displayName = 'LayoutComponents';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  //
};

const Layout = (props) => {
  const { children } = props;
  useGlobalStyles();
  return (
    <PublicLayout>
      {children}
    </PublicLayout>
  );
};

Layout.displayName = displayName;
Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
