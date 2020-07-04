import Head from "next/head";
import { AppProps } from "next/app";

import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

import "../styles/index.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Github Observer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
