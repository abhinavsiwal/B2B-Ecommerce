import "../styles/globals.css";
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/css/bootstrapf9e3.css";
import "../styles/css/uif9e3.css";
import "../styles/css/responsivef9e3.css";
import "../styles/fonts/material-icon/css/round.css";

import Layout from "../src/components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import type { AppProps } from "next/app";
import React from "react";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 2000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
};
let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AlertProvider template={AlertTemplate} {...options}>
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
          </AlertProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
