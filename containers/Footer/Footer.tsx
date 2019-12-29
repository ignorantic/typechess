// import libs
import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';

// import components
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
  footer: {
    fontSize: 16,
  },
}));

interface FooterProps {
  someProp?: string | undefined;
}

const displayName = 'FooterComponent';

const propTypes = {
  //
};

const defaultProps = {
  //
};

const Footer: FunctionComponent<FooterProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Container>
        Footer
      </Container>
    </div>
  );
};

Footer.displayName = displayName;
Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
