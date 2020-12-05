import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import photos from "./reducers/photos";
import user from "./reducers/user";
import currentPhoto from "./reducers/currentPhoto";

import Auth from "./components/Auth";
import Photos from "./containers/Photos";
import FullSizePhoto from "./containers/FullSizePhoto";

localStorage.setItem("page", 1);

const rootReducer = combineReducers({
  photos,
  user,
  currentPhoto,
});

const store = createStore(rootReducer);
const customHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <Route exact path="/" component={Auth} />
      <Route path="/photos" component={Photos} />
      <Route path="/photos/:id" component={FullSizePhoto} />
    </Router>
  </Provider>,
  document.querySelector("#app")
);