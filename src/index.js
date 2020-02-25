import React from "react";
import { hydrate, render } from "react-dom";
import Router from "./router";
import { Provider } from "react-redux";
import store from "./store";
import "swiper/dist/css/swiper.min.css";
import "../css/main.css";

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.querySelector("#app")
);
