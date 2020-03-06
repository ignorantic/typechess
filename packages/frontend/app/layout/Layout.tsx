// import libs
import React, { FC } from 'react';
import PropTypes from 'prop-types';

// import components
import PublicLayout from './Public';
import { Children } from '../common/components/types';

interface LayoutProps {
  readonly children: Children;
}

const displayName = 'LayoutComponents';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
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
