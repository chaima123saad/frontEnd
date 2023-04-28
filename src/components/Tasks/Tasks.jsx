import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RightCircleOutlined, ClockCircleOutlined, BarsOutlined } from "@ant-design/icons"; 
import { Progress, Avatar, Tooltip } from 'antd';
import "./Tasks.css";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
const Card = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:2000/projects/644647eabd128a74b6428f2a/tasks')
      .then(response => {
        const inProgressTasks = response.data.filter(task => task.status === 'inProgress');
        setTasksInProgress(inProgressTasks);
        const toDoTasks = response.data.filter(task => task.status === 'toDo');
        setTasksToDo(toDoTasks);
        const doneTasks = response.data.filter(task => task.status === 'completed');
        setTasksDone(doneTasks);     
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  
  const onClick = ({ key }) => {
    message.info(`Click on project   ${key}`);
  };
  const items = [
    {
      label: '1st menu item',
      key: '1',
    },
    {
      label: '2nd menu item',
      key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];

  return (
    <div>
      <div className='header_task'>
      <div className='titleTask'>Tasks</div>
      <Dropdown
    menu={{
      items,
      onClick,
    }}
    className='dropDown'
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Choose a project
        <DownOutlined />
      </Space>
    </a>
  </Dropdown></div>
      <div className='content'>
      <div className='Content_task'>
        <div className='col-task'>
          <span className='task_list'>To do</span>
          <span className='row-number'>{tasksToDo.length}</span>
          {tasksToDo.map(task => (
            <div key={task.id} className="taskcard">
              <div className="card-content-task">
              <div className={`priority_${task.priority}`}>{task.priority}</div>
                <p className="card-description-task">{task.name}</p>
                <p className="card-desc">{task.description}</p>
                <Progress className='progress' percent={50} status="active" strokeColor="#ff6201c9" size={[290, 15]}/>
                <div className="card-footer-task">
                  <div className='buttons'>
                   
                  </div>
                  <div style={{marginTop:7}}>
                    <ClockCircleOutlined className='icontask'/>
                    &nbsp;
                    <span>6d</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

    <div className='col-task'>
        <span className='task_list'>In Progress</span>
        <span className='row-number-2'>{tasksInProgress.length}</span>
        {tasksInProgress.map(task => (
          <div key={task.id} className="taskcard">
            <div className="card-content-task">
            <div className={`priority_${task.priority}`}>{task.priority}</div>
              <p className="card-description-task">{task.name}</p>
              <p className="card-desc">{task.description}</p>
              <Progress className='progress' percent={50} status="active" strokeColor="#ff6201c9" size={[290, 15]}/>
              <div className="card-footer-task">
                <div className='buttons'>
                  
            
                </div>
                <div style={{marginTop:7}}>
                  <ClockCircleOutlined className='icontask'/>
                  &nbsp;
                  <span>6d</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='col-task'>
          <span className='task_list'>Done</span>
          <span className='row-number-3'>{tasksDone.length}</span>
          {tasksDone.map(task => (
            <div key={task.id} className="taskcard">
              <div className="card-content-task">
              <div className={`priority_${task.priority}`}>{task.priority}</div>
                <p className="card-description-task">{task.name}</p>
                <p className="card-desc">{task.description}</p>
                <Progress className='progress' percent={50} status="active" strokeColor="#ff6201c9" size={[290, 15]}/>
                <div className="card-footer-task">
                  <div style={{marginTop:7}}>
                    <ClockCircleOutlined className='icontask'/>
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