import React from "react";

interface props {
  completed: boolean;
  text: string;
  onClick: () => void;
  id: number;
}

const Todo: React.FC<props> = ({completed, text, onClick}) => {
  return (
    <>
      <span>asjkdaksjd</span>
      <li
        onClick={onClick}
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}>
        {text}
      </li>
    </>
  );
};
export default Todo;
