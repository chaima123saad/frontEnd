import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faArrowUpShortWide,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import DataGrid from "../DataGrid/DataGrid";
import RightDrawer from "../Drawer/Drawer";
import "./dashboard.css";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="manager-container">
      <div className="content-container">
        <div className="projects-header">
          <div className="projects-header-title">
            <div className="projects-title">Projects</div>
            <div className="projects-buttons">
              <button className="projects-filter-button">
                <FontAwesomeIcon icon={faArrowUpShortWide} />
                <span className="buttom-text">Filter</span>
              </button>
              <button
                className="projects-add-button"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
                <span className="buttom-text" onClick={()=> setIsOpen(true)}>Add Project</span>{" "}
              </button>
              <RightDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <h2>Drawer Content</h2>
                <p>This is some content inside the drawer.</p>
              </RightDrawer>
            </div>
          </div>
          <p className="projects-subtitle">
            Showing 5 out of 10 projects in total
          </p>
        </div>

        <section className="projects-section">
          <DataGrid />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
