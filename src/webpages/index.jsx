import React, { Component, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import "./css/style.css";

function Index() {
  let token = sessionStorage.getItem("token");
    let navigate = useNavigate();
    useEffect(() => {
      if (token) {
        navigate('/home');
      }
  },[])
  return (
    <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <div className="pageSwitcher">
          <div className="pr-4">
            <NavLink to="/" className="pageSwitcherItem">
              {" "}
              Sign In
            </NavLink>
          </div>
          <div className="p-6">
            <NavLink exact="true" to="/sign-up" className="pageSwitcherItem">
              Sign Up
            </NavLink>
          </div>
        </div>
        <div className="formTitle">
          <NavLink to="/" className="formTitleLink">
            {" "}
            Sign In
          </NavLink>{" "}
          or{" "}
          <NavLink exact="true" to="/sign-up" className="formTitleLink">
            Sign Up
          </NavLink>
        </div>
        <Routes>
          <Route exact="true" path="/sign-up" element={<SignUpForm></SignUpForm>} />
          <Route path="/" element={<SignInForm></SignInForm>} />
        </Routes>
      </div>
    </div>
  );
}

export default Index;
