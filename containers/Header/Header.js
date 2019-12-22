// import libs
import React from 'react';

const displayName = 'PublicHeaderComponent';

const propTypes = {
  //
};

const defaultProps = {
  //
};

const Header = props => {
  return (
    <header>
      Header
    </header>
  );
};

Header.displayName = displayName;
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
