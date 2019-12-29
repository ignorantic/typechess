// import libs
import React, { FunctionComponent } from 'react';
import PropTypes, { ReactElementLike, ReactNodeArray } from 'prop-types';

// import components
import PublicLayout from './Public';

interface LayoutProps {
  children: string | number | boolean | {} | ReactElementLike | ReactNodeArray;
}

const displayName = 'LayoutComponents';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Layout: FunctionComponent<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  return (
    <PublicLayout>
      {children}
    </PublicLayout>
  );
};

Layout.displayName = displayName;
Layout.propTypes = propTypes;

export default Layout;
