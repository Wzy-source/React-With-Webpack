//ts和immer的结合
//1.immer建议使用工具类Immutable来递归地将整个type tree定义为readonly
//如type state = Immutable<State>

//2.如果一个柯里化的函数直接作为参数传入setter function
//则draft将获得类型推断
/*
import {Immutable, produce} from "immer"

type Todo = Immutable<{
  title: string
  done: boolean
}>

// later...

const [todo, setTodo] = useState<Todo>({
  title: "test",
  done: true
})

// later...

setTodo(
  produce(draft => {
    // draft will be strongly typed and mutable!
    draft.done = !draft.done
  })
)*/

//3.如果柯里函数不是直接作为参数传入到setter function中的
//需要进行以下方式，从而对draft获得类型推断
/*
const toggler = produce<Todo>(draft => {
  draft.done = !draft.done
})

// typeof toggler = (state: Todo) => Todo
// typeof draft = Draft<Todo>(writable)
*/

//需求：一个对象数组，存了name和id
//有两个按钮，第一个按钮用于向该数组中增加一个对象
//第二个按钮用于向该数组中修改第一个对象的name和id
import React, { useState } from "react";
import { produce } from "immer";

type TodoListType = Array<{
  name: string;
  id: number;
}>;

export const MyImmer: React.FC = () => {
  const [count, setCount] = useState(0);
  const [objList, setObjList] = useState<TodoListType>([
    {
      name: "wzy",
      id: 12,
    },
  ]);
  const addToList = produce<TodoListType>((draft) => {
    setCount(count + 1);
    console.log(count);
    draft.push({
      name: "hh",
      id: count,
    });
  });
  const changeListItem = produce<TodoListType>((draft) => {
    draft[0].name = "tjl";
  });
  return (
    <div>
      <ul>
        {objList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          setObjList(addToList);
        }}>
        增加一个对象
      </button>
      <button
        onClick={() => {
          setObjList(changeListItem);
        }}>
        改变第一个对象的名字
      </button>
    </div>
  );
};
