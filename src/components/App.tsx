import React from "react";
import Footer from "./Footer";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";
import {Customer} from "./Customer";
import {UserInfo} from "./UserInfo";

const App = () => (
  <div>
    <Customer />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <UserInfo />
  </div>
);

export default App;
