import React from "react";
import { Customer } from "./Customer";
import { UserInfo } from "./UserInfo";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { MyImmer } from "./immer/MyImmer";

const App = () => {
  return useRoutes([
    {
      path: "/",
      element: <Customer />,
      children: [
        {
          path: "userInfo",
          element: <UserInfo />,
        },
        {
          path: "immer",
          element: <MyImmer />,
        },
      ],
    },
  ]);
};

export default App;
