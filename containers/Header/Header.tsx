// import libs
import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';

interface HeaderProps {
  someProp?: string | undefined;
}

const displayName = 'HeaderComponent';

const propTypes = {
  //
};

const defaultProps = {
  //
};

const Header: FunctionComponent<HeaderProps> = () => (
  <header>
    <Container>
      Header
    </Container>
  </header>
);

Header.displayName = displayName;
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
