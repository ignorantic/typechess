// import libs
import React, { FC } from 'react';
import PropTypes, { ReactElementLike, ReactNodeArray } from 'prop-types';
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

interface PublicLayoutProps {
  readonly children: string | number | boolean | {} | ReactElementLike | ReactNodeArray;
}

const displayName = 'PublicLayoutComponent';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const PublicLayout: FC<PublicLayoutProps> = (props: PublicLayoutProps) => {
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

PublicLayout.displayName = displayName;
PublicLayout.propTypes = propTypes;

export default PublicLayout;
