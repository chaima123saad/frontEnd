import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Collapse.css';
import { Button, Popconfirm, Result, Spin } from 'antd';
import { FieldTimeOutlined, ContainerOutlined, ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const CollapseList = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const { id } = useParams();
  const [openMemberId, setOpenMemberId] = useState(null);
  const [memberTasks, setMemberTasks] = useState([]);
  const [oumaymaTasks, setOumaymaTasks] = useState([]);

  const handleTaskCheck = (task, memberId) => {
    const updatedTasks = oumaymaTasks.filter((t) => t !== task);
    setOumaymaTasks(updatedTasks);

    axios.post('http://localhost:2000/tasks/addTask', {
      status: 'toDo',
      name: task,
      priority: 'high',
      users: memberId
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(`Task ${task} status updated to 'ToDo'`);
        } else {
          console.log('Failed to update task status');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTaskDelete = (index) => {
    const updatedTasks = [...oumaymaTasks];
    updatedTasks.splice(index, 1);
    setOumaymaTasks(updatedTasks);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2000/users/${id}`)
      .then((response) => {
        setUser(response.data);
        if (response.data.team) {
          const teamId = response.data.team;
          setTeam(teamId);
          localStorage.setItem('teamId', teamId);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id,user]);

  useEffect(() => {
    const storedTeamId = localStorage.getItem('teamId');
    if (storedTeamId) {
      axios
        .get(`http://localhost:2000/teams/${storedTeamId}/members`)
        .then((response) => {
          console.log(response.data);
          setMembers(response.data.members);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (openMemberId) {
        const storedTeamId = localStorage.getItem('teamId');
        if (storedTeamId) {
          try {
            const response = await axios.get(`http://localhost:2000/teams/${storedTeamId}/projects`);
            const inProgressProject = response.data.projects.find(project => project.status === 'inProgress');
      
            const tasksResponse = await axios.get(`http://localhost:2000/tasks/user/${openMemberId}/project/${inProgressProject._id}`);
            console.log("taskResponseDataaaaaaa",tasksResponse.data);
            
            if (Array.isArray(tasksResponse.data)) {
              console.log("perooooooo");
              setMemberTasks(tasksResponse.data);
            } else {
              setMemberTasks([]);
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
  
    fetchData();
  }, [openMemberId]);
  

  useEffect(() => {
    const fetchData = async () => {
      const storedTeamId = localStorage.getItem('teamId');
      if(storedTeamId){
      try {
        const response = await axios.get(`http://localhost:2000/teams/${storedTeamId}/projects`);
        const inProgressProject = response.data.projects.find(project => project.status === 'inProgress');
  
        const taskListResponse = await axios.get(`http://localhost:2000/chatGpt/task-list/${inProgressProject.name}`);
        
        if (taskListResponse.data.listItems && taskListResponse.data.listItems.length > 0) {
          console.log(taskListResponse.data.listItems);
          const listItems = taskListResponse.data.listItems;
          const tasks = listItems.split('\n').filter((item) => item.trim() !== '');
  
          const firstTaskIndex = tasks.findIndex((item) => /^[0-9]+\./.test(item));
  
          if (firstTaskIndex !== -1) {
            const trimmedTasks = tasks
              .slice(firstTaskIndex)
              .map((item) => item.replace(/^[0-9]+\. /, ''));
            setOumaymaTasks(trimmedTasks);
          } else {
            console.log('No task items found.');
          }
        } else {
          console.log('Empty listItems response.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
    };
  
    fetchData();
  }, []);
  

  const handleCollapse = (memberId, e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL' || e.target.tagName === 'BUTTON') {
      e.stopPropagation();
      return;
    }
  
    setOpenMemberId((prevOpenMemberId) => (prevOpenMemberId === memberId ? null : memberId));
  };
  return (
    <div className='content_supervise'>
      <div className='titleSupervise'>Supervise Team Employee</div>
      {loading ? (
        <Result
          status="404"
          title="No Employee"
        />
      ) : (
        members.map((member) => (
          <div key={member._id}>
            <button
              className="collapse-toggle collapse"
              onClick={(e) => handleCollapse(member._id, e)}
              aria-expanded={openMemberId === member._id}
            >
              <div style={{ display: 'flex', gap: "1rem" }}>
                <img
                  src={member.profileImage}
                  style={{ borderRadius: '50%', height: 50 }}
                  alt="Member Avatar"
                />
                <div>
                  <p style={{ fontSize: 17 }}>{member.name}&nbsp;{member.lastName}</p>
                  <p style={{ color: "gray" }}>{member.speciality}</p>
                </div>
              </div>
              {openMemberId === member._id && (
                <div className="collapse-content">
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <div>
                      <div className='grayBorder1' style={{ display: "flex", justifyContent: 'space-between', marginBottom: 15 }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <div className='done'></div>
                          <p > Done </p>
                        </div>
                        <p style={{ paddingRight: 20, color: '#8b8b8b' }}><ExclamationCircleOutlined />&nbsp;&nbsp;Please check the tasks</p>
                      </div>
                      {memberTasks
                        .filter((task) => task.status === 'completed')
                        .map((task) => (
                          <div key={task._id} style={{ marginLeft: 5, display: 'flex', gap: 10, marginTop: 5 }}>
                            <input type='checkbox' id={task._id} className='check' />
                            <label htmlFor={task._id}>{task.name}</label>
                          </div>
                        ))}
                    </div>

                    <div>
                      <div className='grayBorder2' style={{ marginBottom: 15 }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <div className='progres'></div>
                          <p>In Progress</p>
                        </div>
                      </div>
                      {memberTasks
                        .filter((task) => task.status === 'inProgress')
                        .map((task) => (
                          <div style={{ display: "flex", gap: "0.5rem", paddingBottom: "10px" }}>
                            <FieldTimeOutlined style={{ fontSize: 22, color: "gray" }} />
                            <label key={task._id}>{task.name}</label>
                          </div>
                        ))}
                    </div>

                  </div>
                  <div className='grayBorder3' style={{ display: "flex", justifyContent: 'space-between', marginBottom: 15 }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <div className='toDo'></div>
                      <p style={{ color: "black" }}> To Do </p>
                    </div>
                    <p style={{ paddingRight: 30, color: '#8b8b8b' }}>
                      <ExclamationCircleOutlined />&nbsp;&nbsp;Please validate or modify the suggested tasks</p>
                  </div>
                  {memberTasks
                    .filter((task) => task.status === 'toDo')
                    .map((task) => (
                      <div style={{ display: "flex", gap: "0.5rem", paddingBottom: "10px", paddingLeft: 5 }}>
                        <FieldTimeOutlined style={{ fontSize: 22, color: "gray" }} />
                        <label key={task._id} >{task.name}</label>
                      </div>
                    ))}
                  <div style={{ paddingLeft: 5, paddingTop: 20 }}>
                    <p className='suggestedtasks' style={{ paddingBottom: 10 }}>Suggested Tasks</p>
                  </div>
                  <div>
                    {loading ? (
                      <Spin size="small" />
                    ) : oumaymaTasks ? (
                      oumaymaTasks.map((task, index) => (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ paddingLeft: 5, display: 'flex', gap: 10, paddingTop: 5 }}>
                            <input type="checkbox" id={index} className="check" onChange={() => handleTaskCheck(task, member._id)} />
                            <label htmlFor={index}>{task}</label>
                          </div>
                          <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={(e) => {
                              e.stopPropagation();
                              handleTaskDelete(index);
                            }}
                            onCancel={(e) => e.stopPropagation()}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button type="link" className="btnDelete">
                              Delete
                            </button>
                          </Popconfirm>
                        </div>
                      ))
                    ) : (
                      <div>No data</div>
                    )}
                  </div>
                </div>
              )}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CollapseList;






