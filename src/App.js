import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Manager from "./components/manager/project";
import Buttom_header from "./components/Buttom_header/Buttom_header";
import Buttom_header_emp from "./components/Buttom_header_emp/Buttom_header_emp";
import Buttom_header_task from "./components/Buttom_header_task/Buttom_header_task";
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Manager />}>
            <Route index element={<p>nav1</p>} />
            <Route path="/nav2" element={<Buttom_header />} />
            <Route path="/nav3" element={<p>nav3</p>} />
            <Route path="/nav4" element={<Buttom_header_emp />} />
            <Route path="/nav5" element={<p>nav5</p>} />
            <Route path="/nav6" element={<Buttom_header_task />} />
            <Route path="/nav7" element={<p>nav7</p>} />
            <Route path="/nav8" element={<p>nav8</p>} />
          </Route>
                  </Routes>
      </Router>
      <Home />
    </div>
  );
}

export default App;


