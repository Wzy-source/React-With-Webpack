import React from "react";
import {Customer} from "./Customer";
import {UserInfo} from "./UserInfo";
import {useRoutes} from "react-router-dom";

function App() {
  return useRoutes([
    {
      path: "/",
      element: <Customer />,
      children: [
        {
          path: "userInfo",
          element: <UserInfo />,
        },
      ],
    },
  ]);
}

export default App;
