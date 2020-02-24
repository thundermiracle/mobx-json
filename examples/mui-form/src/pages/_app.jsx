import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { initialize, GlobalSmoothScroll } from '@mobx-json/mui-form';

import Layout from 'views/Layout/Layout';
import NextGlobalProgressBar from 'views/NextGlobalProgressBar';
import theme from '../theme';
import itemsSource from '../settings/itemsSource';
import iconsMap from '../settings/iconsMap';
import serviceContainer from '../settings/serviceContainer';

export default class MyApp extends App {
  constructor() {
    super();
    initialize({
      // locale: 'zh',
      itemsSource,
      iconsMap,
      serviceContainer,
    });
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-119418003-4"
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments)};
gtag('js', new Date());gtag('config', 'UA-119418003-4');
              `,
            }}
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <GlobalSmoothScroll />
          <NextGlobalProgressBar />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </>
    );
  }
}
