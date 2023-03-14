import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {SmallUsers, BigUsers} from "./Pages";

export function Navbar(props) {
  return (
    <>
      <div className="chose">
        Выберите кол-во пользователей:
        <button onClick={SmallUsers} className="btn-chose">32 пользователя</button>
        <button onClick={BigUsers} className="btn-chose">1000 пользователей</button>
      </div>
      <Outlet />
    </>
  );
}
