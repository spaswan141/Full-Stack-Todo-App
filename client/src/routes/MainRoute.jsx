import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ForgotPassword from "../pages/ForgetPassword";
import PasswordReset from "../pages/PasswordReset";


const MainRoute = () => {
  const token = JSON.parse(localStorage.getItem("token"))
  return (
    <div>
      <Routes>
    
        <Route
          exact
          path="/"
          element={token !==null ? <Home /> : <Navigate replace to={"/login"} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="password-reset/:id/:token"element={<PasswordReset/>}/>
      </Routes>
    </div>
  );
};

export default MainRoute;
