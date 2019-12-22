// import libs
import React from 'react';
import { makeStyles } from '@material-ui/styles';

// import components
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
  footer: {
    fontSize: 16,
  },
}));

const displayName = 'FooterComponent';

const propTypes = {
  //
};

const defaultProps = {
  //
};

const Footer = props => {
  const classes = useStyles();

  return (
    <nav className={classes.footer}>
      <Container>
        Footer
      </Container>
    </nav>
  );
};

Footer.displayName = displayName;
Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
