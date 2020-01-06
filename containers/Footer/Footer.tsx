// import libs
import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';

// import components
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
}));

interface FooterProps {
  readonly someProp?: string | undefined;
}

const displayName = 'FooterComponent';

const Footer: FC<FooterProps> = () => {
  const classes = useStyles();
  const year = (new Date()).getFullYear();

  return (
    <Container component="footer" classes={classes}>
      <Typography variant="body1">
        {'Typechess © '}
        {year}
      </Typography>
    </Container>
  );
};

Footer.displayName = displayName;

export default Footer;
