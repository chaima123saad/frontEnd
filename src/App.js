import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Manager from "./components/manager/project";
import Project from "./components/DataGrid/DataGrid";
import Users from "./components/DataGrid_2/Table";
import Tasks from "./components/Tasks/Tasks";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home/Home";
import Single from "./components/DataGrid_2/User";
import MyProject from "./components/MyProject/MyProject";
import Chat from "./components/Chat/Chat";
import Archive from "./components/Archive/Archive";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" component={Home} />
          <Route path="/" element={<Manager />}>
            <Route index element={<Dashboard/>} />
            <Route path="/nav2" element={<Project />} />
            <Route path="/nav3" element={<MyProject />} />
            <Route path="users">
              <Route index element={<Users />} />
              <Route path=":userId" element={<Single/>} />
            </Route>
            <Route path="/nav5" element={<p>nav5</p>} />
            <Route path="/chat" element={<Chat/>} />
            <Route path="/nav6" element={<Tasks />} />
            <Route path="/nav7" element={<Archive/>} />
            <Route path="/nav8" element={<p>nav8</p>} />
          </Route>
                  </Routes>
      </Router>
    </div>
  );
}

export default App;


