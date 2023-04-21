import React from "react";
import "./DashboardManager.css";
import TaskCalendar from "./components/taskCalendar";
function DashboardManager() {
  return (
    <div className="dashboard-container">
      <div className="calendar-container">
        <h2>Task Calendar</h2>
        {/* Add calendar component here */}
        <TaskCalendar/>
      </div>
      <div className="analytics-container">
        <h2>Task Analytics</h2>
        {/* Add analytics component here */}
      </div>
      <div className="team-container">
        <h2>Team Management</h2>
        {/* Add team management component here */}
      </div>
      <div className="reports-container">
        <h2>Reports</h2>
        {/* Add reports component here */}
      </div>
    </div>
  );
}

export default DashboardManager;
