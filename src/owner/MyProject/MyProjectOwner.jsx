import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RightCircleOutlined, ClockCircleOutlined, BarsOutlined } from "@ant-design/icons"; 
import { Progress, Avatar, Tooltip } from 'antd';
import "./MyProject.css";

const Card = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [projectsToDo, setProjectsToDo] = useState([]);
  const [projectsInProgress, setProjectsInProgress] = useState([]);
  const [projectsDone, setProjectsDone] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});


  useEffect(() => {
    axios.get('http://localhost:2000/projects/')
      .then(response => {
        const inProgressProjects = response.data.filter(project => project.status === 'inProgress');
        setProjectsInProgress(inProgressProjects);
        const toDoProjects = response.data.filter(project => project.status === 'toDo');
        setProjectsToDo(toDoProjects);
        const doneProjects = response.data.filter(project => project.status === 'completed');
        setProjectsDone(doneProjects);
  
        // Iterate over each project in projectsToDo and make a separate request for its task count
        toDoProjects.forEach(project => {
          axios.get(`http://localhost:2000/projects/${project._id}/tasks/count`)
          .then(response => {
            setTaskCounts(taskCounts => ({ ...taskCounts, [project._id]: response.data.taskNumber }));
          })
          .catch(error => {
            console.log(error);
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  
  

  return (
    <div>
      <div className='titleProject'>My Project</div>
      <div className='content'>
      <div className='Content_project'>
        <div className='col-project'>
          <span className='project_list'>To do</span>
          <span className='row-number'>{projectsToDo.length}</span>
          {projectsToDo.map(project => (
            <div key={project.id} className="Projectcard">
              <div className="card-content-project">
              <div className={`priority_${project.priority}`}>{project.priority}</div>
                <p className="card-description-project">{project.name}</p>
                <p className="card-desc">{project.description}</p>
                <Progress className='progress' percent={50} status="active" strokeColor="#ff6201c9" size={[290, 15]}/>
                <div className="card-footer-project">
                  <div className='buttons'>
                   
                    <button onClick={() => {
                      setModalOpen(true);
                    }} className='btnClass'>
                      <BarsOutlined />&nbsp;&nbsp;
                      <span>{taskCounts[project._id]}</span>
                    </button>
                  </div>
                  <div style={{marginTop:7}}>
                    <ClockCircleOutlined className='iconProject'/>
                    &nbsp;
                    <span>6d</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

    <div className='col-project'>
        <span className='project_list'>In Progress</span>
        <span className='row-number-2'>{projectsInProgress.length}</span>
        {projectsInProgress.map(project => (
          <div key={project.id} className="Projectcard">
            <div className="card-content-project">
            <div className={`priority_${project.priority}`}>{project.priority}</div>
              <p className="card-description-project">{project.name}</p>
              <p className="card-desc">{project.description}</p>
              <Progress className='progress' percent={50} status="active" strokeColor="#ff6201c9" size={[290, 15]}/>
              <div className="card-footer-project">
                <div className='buttons'>
                  
                  <button onClick={() => {
                    setModalOpen(true);
                  }} className='btnClass'>
                    <BarsOutlined />&nbsp;&nbsp;
                    <span>{project.tasksComplete}/{project.totalTasks}</span>
                  </button>
                </div>
                <div style={{marginTop:7}}>
                  <ClockCircleOutlined className='iconProject'/>
                  &nbsp;
                  <span>6d</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='col-project'>
          <span className='project_list'>Done</span>
          <span className='row-number-3'>{projectsDone.length}</span>
          {projectsDone.map(project => (
            <div key={project.id} className="Projectcard">
              <div className="card-content-project">
              <div className={`priority_${project.priority}`}>{project.priority}</div>
                <p className="card-description-project">{project.name}</p>
                <p className="card-desc">{project.description}</p>
                <Progress className='progress' percent={50} status="active" strokeColor="#ff6201c9" size={[290, 15]}/>
                <div className="card-footer-project">
                  <div className='buttons'>
                    
                    <button onClick={() => {
                      setModalOpen(true);
                    }} className='btnClass'>
                      <BarsOutlined />&nbsp;&nbsp;
                      <span>{project.tasksComplete}/{project.totalTasks}</span>
                    </button>
                  </div>
                  <div style={{marginTop:7}}>
                    <ClockCircleOutlined className='iconProject'/>
                    &nbsp;
                    <span>6d</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

    </div> 
    </div>
    </div>
  );
};

export default Card;