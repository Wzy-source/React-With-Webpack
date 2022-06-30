import React, { useState } from "react";
import produce from "immer";

interface UserInfoState {
  name: string;
  age: number;
}

export const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoState>({
    name: "wzy",
    age: 22,
  });

  const handleUserInfoChange = (type: string, value: string) => {
    setUserInfo(
      //immer柯里化的写法是直接返回一个修改函数
      //然后利用该函数对draft的修改，反应到state上(d但不是真的修改state)，然后返回修改后的nextState上
      produce((draft) => {
        draft[type] = value;
      }),
    );
  };
  return (
    <>
      <div>
        <span>姓名：{userInfo.name}</span>
        <span>年龄：{userInfo.age}</span>
      </div>
      <input
        type="text"
        value={userInfo.name}
        placeholder={"更改姓名"}
        onChange={(e) => {
          handleUserInfoChange("name", e.target.value);
        }}
      />
      <input
        type="text"
        value={userInfo.age}
        placeholder={"更改年龄"}
        onChange={(e) => {
          handleUserInfoChange("age", e.target.value);
        }}
      />
    </>
  );
};
