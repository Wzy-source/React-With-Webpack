import React from "react";
import "../style/Customer.scss";
import Style from "../style/customer.module.scss";
import {Outlet} from "react-router-dom";

export const Customer = () => {
  return (
    <>
      <div className={`${Style.fontStyle} color-red`}>this is a text</div>
      <Outlet />
    </>
  );
};
