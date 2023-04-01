import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Navbar from './Navbar';
import Home from "./components/home";
import Login from "./components/auth/LoginForm";
import ForgotPassword from "./components/auth/ForgotPassword";
import Manager from "./components/manager/project";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/project" element={<Manager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;