import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../layout';
import index from '../common/theme';
import _store from '../store';

const EnhanceApp = (props) => {
  const {
    Component,
    pageProps,
    store,
  } = props;

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <MuiThemeProvider theme={index}>
      <CssBaseline />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </MuiThemeProvider>
  );
};

EnhanceApp.getInitialProps = async ({ Component, ctx }) => ({
  pageProps: Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {},
});

export default withRedux(_store)(EnhanceApp);
