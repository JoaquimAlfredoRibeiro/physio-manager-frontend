import React from "react";
import ReactDOM from "react-dom";
import App from "./main/App";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore
} from "react-redux-i18n";
import en from "./i18n/en";
import pt from "./i18n/pt";

import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";

import reducers from "./main/reducers";

// import "./components/style/custom.css";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create store
const store = applyMiddleware(thunk, multi, promise)(createStore)(
  reducers,
  devTools
);

// add translations to Store
export const translationsObject = {
  en: en,
  pt: pt
};

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale("en"));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("wrapper")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
