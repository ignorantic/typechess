// import libs
import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';

// import components
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
  section: {
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
    <div className={classes.section}>
      <Container>
        Main
      </Container>
    </div>
  );
};

Main.displayName = displayName;
Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
