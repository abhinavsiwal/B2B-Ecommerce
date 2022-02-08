import React, { useEffect } from "react";
import Script from "next/script";
import "../styles/globals.css";

import "../styles/css/theme.css";
import type { AppProps } from "next/app";
import Layout from "../src/components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  

  return (
    <React.Fragment>
      <Layout>
      <Component {...pageProps} />
      <Script src="../styles/script/theme.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
      </Layout>
    </React.Fragment>
  );
}

export default MyApp;
