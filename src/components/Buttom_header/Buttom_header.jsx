import React, { useState } from "react";
import {PlusCircleFilled} from "@ant-design/icons";
import DataGrid_2 from "../DataGrid/DataGrid";
import RightDrawer from "../Drawer/Drawer";
import "./Buttom_header.css";
import DropDownFilter from "../DropDownFilter/Filter";

const Buttom_header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="manager-container">
      <div className="content-container">
        <div className="projects-header">
          <div className="projects-header-title">
            <div className="projects-title">Projets</div>
            <div className="projects-buttons">
              <button className="projects-add-button">
              <DropDownFilter/>
              </button>
              
              <button
                className="projects-add-button"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <PlusCircleFilled />

                <span className="buttom-text" onClick={()=> setIsOpen(true)}>Ajouter Projet</span>{" "}
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
          <DataGrid_2 />
        </section>
      </div>
    </div>
  );
};

export default Buttom_header;
