import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import { Header } from 'components/layout/Header';
import { Footer } from 'components/layout/Footer';
import { StoreProvider } from 'store';

import 'styles/index.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Github Observer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StoreProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </StoreProvider>
    </>
  );
};

export default MyApp;
