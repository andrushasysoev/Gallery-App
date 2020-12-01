import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { createStore } from "redux";
import { Provider } from "react-redux";

import gallery from "./reducers";
import Auth from "./components/Auth";
import Photos from "./containers/Photos";
import FullSizePhoto from "./containers/FullSizePhoto";

localStorage.setItem("page", 1);

const store = createStore(gallery);
const customHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <Route exact path="/" component={Auth} />
      <Route path="/photos" component={Photos} />
      <Route exact path="/photos/:id" component={FullSizePhoto} />
    </Router>
  </Provider>,
  document.querySelector("#app")
);