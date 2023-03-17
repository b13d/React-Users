import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {SmallUsers, BigUsers} from "./Pages";

export function Navbar(props) {
  return (
    <>

      <Outlet />
    </>
  );
}
