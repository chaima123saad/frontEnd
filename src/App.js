import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Manager from "./components/manager/project";
import Owner from "./owner/owner/project";
import Employee from "./Employee/Employee/project";
import Project from "./components/DataGrid/DataGrid";
import Users from "./components/DataGrid_2/Table";
import Tasks from "./components/Tasks/Tasks";
import Dashboard from "./components/dashboard/Dashboard";
import Single from "./components/DataGrid_2/User";
import Members from "./components/Description_equipe/Members";
import MyProject from "./components/MyProject/MyProject";
import Archive from "./components/Archive/Archive";
import Team from "./components/Description_equipe/Desp_equipe";
import Edit from "./components/Description_equipe/Team";
import Login from "./components/loginpage/Login";
import Home from "./components/Home/hm";
import Pro from './components/DataGrid/Pro';
import Supervise from './owner/supervise/Supervise';
import Chat from './owner/Chat/ChatOwner';
import ArchiveProject from './components/Archive/ArchiveProject';
import ArchiveEmployee from './components/Archive/ArchiveEmployee';
import ArchiveTeam from './components/Archive/ArchiveTeam';
import ResetPassword from './components/auth/ResetPassword';
import ForgotPassword from './components/auth/ForgotPassword';


function App() {
 
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/" >
              <Route index element={<Home/>} />
          </Route>

          <Route path="/manager/:id" element={<Manager/>}>
            <Route index element={<Dashboard/>} />
            <Route path="/manager/:id/projects">
              <Route index element={<Project />} />
              <Route path=":projectId" element={<Pro/>} />
            </Route>

            <Route path="/manager/:id/nav3" element={<MyProject />} />
            <Route path="/manager/:id/users">
              <Route index element={<Users />} />
              <Route path=":userId" element={<Single/>} />
            </Route>

            <Route path="/manager/:id/nav5">
              <Route index element={<Team />} />
              <Route path=":teamId" element={<Members/>} />
              <Route path="edit/:teamId" element={<Edit/>} />
            </Route>

            <Route path="/manager/:id/chat" element={<Chat/>} />
            <Route path="/manager/:id/nav6" element={<Tasks />} />
            <Route path="/manager/:id/archive"  />

            <Route path="/manager/:id/archive">
              <Route index element={<Archive/>} />
              <Route path="projects" element={<ArchiveProject/>} />
              <Route path="employee" element={<ArchiveEmployee/>} />
              <Route path="team" element={<ArchiveTeam/>} />
            </Route>

          </Route>

          <Route path="/owner/:id" element={<Owner/>}>
          <Route index element={<Dashboard/>} />
          <Route path="/owner/:id/supervise" element={<Supervise />} />
          <Route path="/owner/:id/chat" element={<Chat />} />
          <Route path="/owner/:id/myproject" element={<MyProject />} />
          <Route path="/owner/:id/task" element={<Tasks />} />
          </Route>

          <Route path="/employee/:id" element={<Employee/>}>
          <Route index element={<Dashboard/>} />
          <Route path="/employee/:id/chat" element={<Chat />} />
          <Route path="/employee/:id/myproject" element={<MyProject />} />
          <Route path="/employee/:id/task" element={<Tasks />} />
          </Route>

        </Routes>

      </Router>

    </div>
  );
}

export default App;


