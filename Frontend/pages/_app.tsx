import React, { useEffect } from "react";
import Script from "next/script";
import "../styles/globals.css";
import "../styles/css/theme.css";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import type { AppProps } from "next/app";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../src/components/Layout/Layout";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 4000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
};
let persistor = persistStore(store);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <AlertProvider template={AlertTemplate} {...options}>
              <Component {...pageProps} />
            </AlertProvider>
            <Script src="../styles/script/theme.js" />
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
          </Layout>
        </PersistGate>
      </Provider>
    
    </React.Fragment>
  );
}

export default MyApp;
