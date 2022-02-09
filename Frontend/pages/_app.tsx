import React, { useEffect } from "react";
import Script from "next/script";
import "../styles/globals.css";

import "../styles/css/theme.css";
import type { AppProps } from "next/app";
import Layout from "../src/components/Layout/Layout";

import { positions,transitions,Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic'

const options = {
  timeout:2000,
  position:positions.TOP_CENTER,
  transition:transitions.SCALE,
}

function MyApp({ Component, pageProps }: AppProps) {
  

  return (
    <React.Fragment>
      <Layout>
      <AlertProvider template={AlertTemplate} {...options}>
      <Component {...pageProps} />
      </AlertProvider>
      <Script src="../styles/script/theme.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
      </Layout>
    </React.Fragment>
  );
}

export default MyApp;
