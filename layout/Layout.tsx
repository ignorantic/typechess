// import libs
import React, { FunctionComponent } from 'react';
import PropTypes, { ReactElementLike, ReactNodeArray } from 'prop-types';

// import components
import PublicLayout from './Public';

// import resources
import useGlobalStyles from '../assets/jss/global';

interface LayoutProps {
  children: string | number | boolean | {} | ReactElementLike | ReactNodeArray;
}

const displayName = 'LayoutComponents';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Layout: FunctionComponent<LayoutProps> = (props: LayoutProps) => {
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

export default Layout;
