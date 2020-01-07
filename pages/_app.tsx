import React, { ComponentType } from 'react';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import withRedux from 'next-redux-wrapper';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStore from '../store/makeStore';
import Layout from '../layout';
import theme from '../common/theme';

interface AppProps {
  Component: ComponentType;
  pageProps: object;
  store: Store;
}

class App extends NextApp<AppProps> {
  static async getInitialProps(appContext: AppContext): Promise<AppInitialProps> {
    const { Component, ctx } = appContext;
    const componentGetInitialProps = Component.getInitialProps
      || ((): Promise<void> => Promise.resolve());
    const pageProps = await componentGetInitialProps(ctx);
    return { pageProps };
  }

  componentDidMount(): void {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render(): JSX.Element {
    const { Component, pageProps, store } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </MuiThemeProvider>
    );
  }
}


export default withRedux(makeStore)(App);
