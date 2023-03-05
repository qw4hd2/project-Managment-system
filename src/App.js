import React, { Component } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./webpages/home/home.jsx";
import UserAuth from "./webpages/index.jsx";
import Projectview from "./webpages/projectView/project.view.jsx";
import Projectmember from "./webpages/projectmember/projectmember.jsx";
import Request from "./webpages/request/request.jsx";
import Task from "./webpages/projectmember/taskForMember.jsx";

export default function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path="*" element={<UserAuth/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/seeProjects" element={<Projectview/>}></Route>
          <Route path="/Projectmember/:id" element={<Projectmember/>}></Route>
          <Route path="/request" element={<Request/>}></Route>
          <Route path="/taskformember/:id" element={<Task/>}/>
       </Routes>
    </BrowserRouter>
  )
}
