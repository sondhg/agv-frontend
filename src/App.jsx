"use client";

import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";
import Layout from "./Layout";
import { persistor, store } from "./redux/store";


export default function App() {
  const Fallback = ({ error }) => (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="text-error">{error.message}</pre>
      <pre>{error.stack}</pre>
    </div>
  );

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

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ErrorBoundary>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
