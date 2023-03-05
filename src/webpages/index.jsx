import React, { Component } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";


import "./css/style.css";
class Index extends Component {
  render() {
    return (
        <div className="App">
          <div className="appAside" />
          <div className="appForm">
            <div className="pageSwitcher">
              <div className="pr-4">
              <NavLink to="/" className="pageSwitcherItem"> Sign In</NavLink>
              </div>
              <div className="p-6">
              <NavLink exact="true"to="/sign-up" className="pageSwitcherItem">Sign Up</NavLink>
              </div>
            </div>
            <div className="formTitle">
              <NavLink to="/"className="formTitleLink" > Sign In</NavLink>{" "}
              or{" "}
              <NavLink exact="true"to="/sign-up"className="formTitleLink">Sign Up</NavLink>
            </div>
            <Routes>
              <Route exact="true" path="/sign-up" element={<SignUpForm></SignUpForm>} />
              <Route path="/" element={<SignInForm></SignInForm>} />
            </Routes>
          </div>
        </div>

    );
  }
}

export default Index;
