import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import todoApp from "./reducers";
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";

const store = createStore(todoApp);

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
