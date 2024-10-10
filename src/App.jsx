"use client";

import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";
import Layout from "./Layout";
import { persistor, store } from "./redux/store";

export default function App() {
  const Fallback = ({ error }) => {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre className="text-red-600">{error.message}</pre>
      </div>
    );
  };

  Fallback.propTypes = {
    error: PropTypes.object,
  };

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
