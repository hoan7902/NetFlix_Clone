import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from './app/store'
import ToggleColorModeProvider from './utils/ToggleColorMode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <React.StrictMode>
        <Router>
          <App />
          <ToastContainer />
        </Router>
      </React.StrictMode>
    </ToggleColorModeProvider>
  </Provider>,
  document.getElementById("root")
);
