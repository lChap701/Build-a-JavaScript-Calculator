import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {Container} from "./react-redux/Container";
import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById("root")
)
