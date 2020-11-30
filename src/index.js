import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { createStore } from "redux";
import { Provider } from "react-redux";

import gallery from "./reducers";
import Auth from "./containers/Auth";
import Photos from "./containers/Photos";
import FullSizePhoto from "./containers/FullSizePhoto";

document.querySelector("body").innerHTML = '<div id="app"></div>';

localStorage.setItem("page", 1);

const store = createStore(gallery);
const customHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <Switch>
        <Route exact path="/photos/:id" component={FullSizePhoto} />
        <Route exact path="/photos" component={Photos} />
        <Route exact path="/" component={Auth} />
      </Switch>
    </Router>
  </Provider>,
  document.querySelector("#app")
);
