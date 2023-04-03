import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Navbar from './Navbar';
import Home from "./components/home";
import Login from "./components/auth/LoginForm";
import ForgotPassword from "./components/auth/ForgotPassword";
import Manager from "./components/manager/project";
import Dashboard from "./components/Dashboard/Dashboard";
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Manager />} >
            <Route index  element={<Dashboard />}/>
            <Route  path="/nav2" element={<p>nav2</p>}/>
            <Route  path="/nav3" element={<p>nav3</p>}/>
            </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;