import React, { useState } from "react";
import Todo from "./Todo";

interface props {
  // eslint-disable-next-line no-unused-vars
  onTodoClick: (index: number) => void;
  todos: { id: number; completed: boolean; text: string }[];
}

const TodoList: React.FC<props> = ({ onTodoClick, todos }) => {
  // const [todoList, setTodoList] = useState([{ name: "wzy", id: 12 }]);

  return (
    <>
      <ul>
        {todos.map((todo, index) => (
          <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
