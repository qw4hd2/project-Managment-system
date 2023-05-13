import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./webpages/home/home.jsx";
import UserAuth from "./webpages/index.jsx";
import Projectview from "./webpages/projectView/project.view.jsx";
import Projectmember from "./webpages/projectmember/projectmember.jsx";
import Request from "./webpages/request/request.jsx";
import Task from "./webpages/projectmember/taskForMember.jsx";
import ChatRoom from "./webpages/chatRoom/chatroom.jsx";
import TaskView from "./webpages/projectmember/viewTask/Taskview.js";

function App() {
  let token = sessionStorage.getItem('token');
  return (
    <>
      {token ? (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<UserAuth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/seeProjects" element={<Projectview />} />
            <Route path="/Projectmember/:id" element={<Projectmember />} />
            <Route path="/request" element={<Request />} />
            <Route path="/taskformember/:id" element={<Task />} />
            <Route path="/chatRoom/:id" element={<ChatRoom />} />
            <Route
              path="/taskview/pid/:id/mid/:memberId"
              element={<TaskView />}
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<UserAuth />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
