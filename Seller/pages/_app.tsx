import "../styles/globals.css";
import Script from "next/script";
import "../styles/css/bootstrapf9e3.css";
import "../styles/css/uif9e3.css";
import "../styles/css/responsivef9e3.css";
import "../styles/fonts/material-icon/css/round.css";

import Layout from "../src/components/Layout/Layout";

import type { AppProps } from "next/app";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Layout>
        <Component {...pageProps} />
      {/* <Script
        src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
        integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
        crossOrigin="anonymous"
        />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
        />
      <script src="../styles/script69.js" /> */}
        </Layout>
    </React.Fragment>
  );
}

export default MyApp;
