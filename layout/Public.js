// import libs
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

// import components
import Header from '../containers/Header';
import Footer from '../containers/Footer';

const useStyles = makeStyles(() => (
  {
    page: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flexGrow: 1,
    },
    footer: {
      marginTop: 'auto',
      flexGrow: 0,
    },
  }
));

const displayName = 'PublicLayoutComponent';

const propTypes = {
  children: PropTypes.node.isRequired,
  headerSection: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  secondHeaderSection: PropTypes.shape({
    title: PropTypes.string,
  }),
  bookingSection: PropTypes.shape({
    title: PropTypes.string,
  }),
};

const defaultProps = {
  headerSection: null,
  secondHeaderSection: null,
  bookingSection: null,
};

const PublicLayout = props => {
  const {
    children,
  } = props;

  const classes = useStyles();

  return (
    <>
      <div className={classes.page}>
        <div className={classes.content}>
          <Header />
          {children}
        </div>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
};

PublicLayout.dispatch = displayName;
PublicLayout.propTypes = propTypes;
PublicLayout.defaultProps = defaultProps;

export default PublicLayout;
