import React, { useState } from "react";
import {PlusCircleFilled} from "@ant-design/icons";
import DataGrid_task from "../DataGrid_task/DataGrid_task";
import "./Buttom_header_task.css";
import DropDownFilter from "../DropDownFilter/Filter";

const Buttom_header_task = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="manager-container">
      <div className="content-container">
        <div className="projects-header">
          <div className="projects-header-title">
            <div className="projects-title">Tasks</div>
            <div className="projects-buttons">
              <button className="projects-add-button">
              <DropDownFilter/>
              </button>
              
            </div>
          </div>
          <p className="projects-subtitle">
            Showing 7 tasks in total
          </p>
        </div>

        <section className="projects-section">
        <DataGrid_task />
        </section>
      </div>
    </div>
  );
};

export default Buttom_header_task;
