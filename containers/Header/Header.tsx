// import libs
import React, { FunctionComponent } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
}));

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

const Header: FunctionComponent<HeaderProps> = () => {
  const classes = useStyles();
  return (
    <Container component="header" classes={classes} fixed>
      <Typography variant="body1">Header</Typography>
    </Container>
  );
};

Header.displayName = displayName;
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
