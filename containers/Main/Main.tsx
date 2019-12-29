// import libs
import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';

// import components
import Container from '@material-ui/core/Container';
import Board from '../Board';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 16,
  },
}));

interface MainContainerProps {
  someProp?: string | undefined;
}

const displayName = 'MainContainerComponent';

const propTypes = {
  //
};

const defaultProps = {
  //
};

const Main: FunctionComponent<MainContainerProps> = () => {
  const classes = useStyles();

  return (
    <Container component="section" classes={classes}>
      <Board />
    </Container>
  );
};

Main.displayName = displayName;
Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
