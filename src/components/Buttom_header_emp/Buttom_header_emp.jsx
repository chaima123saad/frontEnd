import React, { useState } from "react";
import {PlusCircleFilled} from "@ant-design/icons";
import DataGrid_2 from "../DataGrid_2/DataGrid_2";
import RightDrawer from "../Drawer_Emp/Drawer_Emp";
import "./Buttom_header_emp.css";
import DropDownFilter from "../DropDownFilter/Filter";

const Buttom_header_emp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="manager-container">
      <div className="content-container">
        <div className="projects-header">
          <div className="projects-header-title">
            <div className="projects-title">Employés</div>
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

                <span className="buttom-text" onClick={()=> setIsOpen(true)}>Ajouter Employé</span>{" "}
              </button>
              <RightDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
    
              </RightDrawer>
            </div>
          </div>
          <p className="projects-subtitle">
            Showing 7 Employee in total
          </p>
        </div>

        <section className="projects-section">
          <DataGrid_2 />
        </section>
      </div>
    </div>
  );
};

export default Buttom_header_emp;
