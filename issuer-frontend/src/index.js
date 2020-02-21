import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./static/main.scss";

import store from "./app/store";
import App from "./App";

// Production requirements.
import { disableReactDevTools } from "./prod";

// REMOVE react dev tools for production build to avoid state manipulation by user
if (process.env.NODE_ENV === 'production')
    disableReactDevTools();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
