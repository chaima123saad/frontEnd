import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckSquareOutlined,AlignLeftOutlined,RightCircleOutlined, UserOutlined,ClockCircleOutlined, BarsOutlined } from "@ant-design/icons"; 
import { Progress, Avatar, Tooltip } from 'antd';
import "./MyProject.css";
import { Dropdown, message, Space,Button, Modal,Result ,Empty} from 'antd';

import img from "../Tasks/checklist.png";
import img1 from "./checked.png";

import { useParams } from 'react-router-dom';
const Card = () => {
  const [open, setOpen] = useState(false);
  const [projectsToDo, setProjectsToDo] = useState([]);
  const [projectsInProgress, setProjectsInProgress] = useState([]);
  const [projectsDone, setProjectsDone] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [projectTasks,setProjectTasks]=useState([]);
  const [projectOpen,setProjectOpen]=useState({});
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [team, setTeam] = useState(null);
  const [teamId, setTeamId] = useState('');
  const [members, setMembers] = useState([]);
  const [taskMatrix, setTaskMatrix] = useState([]);

  const handleOpenModal = (projectId) => {
    localStorage.setItem('projectId', projectId);
    setOpen(true);
  };
  const {id} = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:2000/users/${id}`)
      .then((response) => {
        if (response.data.team) {
          console.log("******", response.data);
          const teamId = response.data.team;
          setTeamId(teamId);
          localStorage.setItem('teamId', teamId);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [teamId]);

  useEffect(() => {
    if (teamId) {
      axios
        .get(`http://localhost:2000/teams/${teamId}`)
        .then((response) => {
          setTeam(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      console.log("Team not found");
    }
  }, [teamId]);

  useEffect(() => {
    if (teamId) {
      axios
        .get(`http://localhost:2000/teams/${teamId}/members`)
        .then((response) => {
          setMembers(response.data.members);
          console.log("members : ",response.data.members);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      console.log("Team not found");
    }
  }, [teamId]);
  
  const handleCloseModal = () => {
    localStorage.removeItem('projectId');
    setOpen(false);

  }; 

  useEffect(() => {
    axios.get('http://localhost:2000/projects/')
      .then(response => {
        const inProgressProjects = response.data.filter(project => project.status === 'inProgress');
        setProjectsInProgress(inProgressProjects);
        const toDoProjects = response.data.filter(project => project.status === 'toDo');
        setProjectsToDo(toDoProjects);
        const doneProjects = response.data.filter(project => project.status === 'completed');
        setProjectsDone(doneProjects);
  
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
  

  useEffect(() => {
      if(open){
    const id = localStorage.getItem('projectId'); 
    axios.get(`http://localhost:2000/projects/${id}/tasks`)
    .then(response => {
        setProjectTasks(response.data);
    })
    .catch(error => {
      console.log(error);
    });}
  }, [open]);
  
  useEffect(() => {
    if(open){
  const id = localStorage.getItem('projectId'); 
  axios.get(`http://localhost:2000/projects/project/${id}`)
  .then(response => {
    setProjectOpen(response.data);
  })
  .catch(error => {
    console.log(error);
  });}
}, [open]);


useEffect(() => {
  if (open) {
    const projectId = localStorage.getItem('projectId');

    axios.get(`http://localhost:2000/projects/${projectId}/tasks`)
      .then(response => {
        const tasks = response.data;

        const userIds = tasks.reduce((ids, task) => {
          task.users.forEach(userId => {
            if (!ids.includes(userId)) {
              ids.push(userId);
            }
          });
          return ids;
        }, []);

        const userRequests = userIds.map(userId =>
          axios.get(`http://localhost:2000/users/${userId}`)
        );

        Promise.all(userRequests)
          .then(responses => {
            const usersData = responses.map(response => response.data);
            const tasksMatrix = usersData.map(user => ({
              userId: user._id,
              userName: user.name,
              userLastName: user.lastName,
              userImage: user.profileImage,
              userProgress: user.progress,

              tasks: tasks.filter(task => task.users.includes(user._id)).map(task => ({
                taskId: task._id,
                taskName: task.name,
                taskStatus: task.status,
                tasksProgress :task.progress,
              }))
            }));
            setTaskMatrix(tasksMatrix);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}, [open]);



useEffect(() => {
  if (taskMatrix.length>0) {
 console.log("taskMatrix : ",taskMatrix);
  }
}, [taskMatrix]);

useEffect(() => {
  if (team) {
 console.log("team : ",team);
  }
}, [users]);




useEffect(() => {
  axios.get('http://localhost:2000/teams/644fcde1e7f894a5e3190e6c/projects')
    .then(response => {
      const projects = response.data.projects;
      const inProgressProjects = projects.filter(project => project.status === 'inProgress');
      const toDoProjects = projects.filter(project => project.status === 'toDo');
      const doneProjects = projects.filter(project => project.status === 'completed');

      if (inProgressProjects.length === 0 && toDoProjects.length > 0) {
        const projectToMove = toDoProjects[0];
        projectToMove.status = 'inProgress';
        inProgressProjects.push(projectToMove);
        toDoProjects.splice(0, 1);

        // Save the updated project status in the database
        axios.put(`http://localhost:2000/projects/updateProject/${projectToMove._id}`, { status: 'inProgress' })
          .then(response => {
            console.log('Project status updated:', response.data);
          })
          .catch(error => {
            console.log('Error updating project status:', error);
          });
      }

      for (let i = 0; i < inProgressProjects.length; i++) {
        const project = inProgressProjects[i];
        if (project.progress === 100) {
          project.status = 'completed';
          doneProjects.push(project);
          inProgressProjects.splice(i, 1);
          i--;

          axios.put(`http://localhost:2000/projects/updateProject/${project._id}`, { status: 'completed' })
            .then(response => {
              console.log('Project status updated:', response.data);
            })
            .catch(error => {
              console.log('Error updating project status:', error);
            });
        }
      }

      setProjectsInProgress(inProgressProjects);
      setProjectsToDo(toDoProjects);
      setProjectsDone(doneProjects);

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
          {projectsToDo.length > 0 ? (
          projectsToDo.map(project => (
            <div key={project.id} className="Projectcard">
              <div className="card-content-project">
              <div className={`priority_${project.priority}`}>{project.priority}</div>
                <p className="card-description-project">{project.name}</p>
                <p className="card-desc">{project.description}</p>
                <Progress className='progress' percent={project.progress} status="active" strokeColor="#744ae2" size={[290, 15]}/>
                <div className="card-footer-project">
                <div className='buttons' onClick={() => handleOpenModal(project._id)}>
                                <img src={img} style={{height:25,cursor:"pointer"}}/>
                                </div>
                  <div style={{marginTop:7}}>
                    <ClockCircleOutlined className='iconProject'/>
                    &nbsp;
                    <span>6d</span>
                  </div>
                </div>
              </div>
            </div>
            ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </div>

    <div className='col-project'>
        <span className='project_list'>In Progress</span>
        <span className='row-number-2'>{projectsInProgress.length}</span>
        {projectsInProgress.length > 0 ? (
        projectsInProgress.map(project => (
          <div key={project.id} className="Projectcard">
            <div className="card-content-project">
            <div className={`priority_${project.priority}`}>{project.priority}</div>
              <p className="card-description-project">{project.name}</p>
              <p className="card-desc">{project.description}</p>
              <Progress className='progress' percent={project.progress} status="active" strokeColor="#744ae2" size={[290, 15]}/>
              <div className="card-footer-project">
              <div className='buttons' onClick={() => handleOpenModal(project._id)}>
                                <img src={img} style={{height:25,cursor:"pointer"}}/>
                                </div>
                <div style={{marginTop:7}}>
                  <ClockCircleOutlined className='iconProject'/>
                  &nbsp;
                  <span>6d</span>
                </div>
              </div>
            </div>
          </div>
         ))
         ) : (
           <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
         )}
      </div>

      <div className='col-project'>
          <span className='project_list'>Done</span>
          <span className='row-number-3'>{projectsDone.length}</span>
          {projectsInProgress.length > 0 ? (
          projectsDone.map(project => (
            <div key={project.id} className="Projectcard">
              <div className="card-content-project">
              <div className={`priority_${project.priority}`}>{project.priority}</div>
                <p className="card-description-project">{project.name}</p>
                <p className="card-desc">{project.description}</p>
                <Progress className='progress' percent={project.progress} strokeColor="#744ae2" status="active" size={[290, 15]}/>
                <div className="card-footer-project">
                <div className='buttons' onClick={() => handleOpenModal(project._id)}>
                                <img src={img} style={{height:25,cursor:"pointer"}}/>
                                </div>
                  <div style={{marginTop:7}}>
                    <ClockCircleOutlined className='iconProject'/>
                    &nbsp;
                    <span>6d</span>
                  </div>
                </div>
              </div>
            </div>
            ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </div>

    </div> 
    </div>
    <Modal
        title=""
        centered
        open={open}
        onCancel={handleCloseModal}
        width={700}
        footer={null}
      >
    <p className='projectName'>{projectOpen.name}</p>
    <p style={{fontSize:15,fontWeight:300,paddingLeft:30}}>{team ? team.name : "No team name available"}</p>
              <hr/>
              <div style={{display:"flex",gap:"1rem"}}>
              <UserOutlined style={{fontSize:20,color:"#626262"}}/>
              <p style={{fontSize:17,paddingBottom:10,fontWeight:600,color:"#626262"}}>Members</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem",paddingLeft:40}}>
              {members.length > 0 ? (
                members.map((user, index) => (
                  <div key={index} className="">
                  
                      <img src={user.profileImage} style={{ width: 35, height: 35, borderRadius: "50%" }} />
                    
                  </div>
                ))
              ) : (
                <p>No members yet</p>
              )}
                    </div>

                    <div style={{display:"flex",gap:"1rem",paddingTop:20}}>
              <AlignLeftOutlined style={{fontSize:20,fontWeight:"900",color:"#626262"}} />
              <p style={{fontSize:17,paddingBottom:10,fontWeight:600,color:"#626262"}}>Description</p>
              </div>
              <p style={{fontSize:16,paddingLeft:40,color:"#626262"}}>{projectOpen.description}</p>

              {taskMatrix.length > 0 ? (
                taskMatrix.map((user, index) => (
                  <div key={index}>
                    <div style={{ display: "flex", gap: "1rem", fontSize: 17, paddingTop: 40,fontWeight:600 ,color:"#626262"}}>
                      <img src={img1} style={{width:20,height:20}} />
                      <p>{user.userName}&nbsp;{user.userLastName}</p>
                    </div>
                    <Progress className='prog01' percent={user.userProgress} strokeColor="#744ae2" status="active" size={[600, 10]}/>

                    <div style={{marginTop:"-12px"}}>
                      {user.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} style={{ display: "flex", gap: "1.2rem", paddingTop: 17 }}>
                <input
                type="checkbox"
                id={task._id}
                className="boxCheck"
                checked={task.tasksProgress === 100}
                style={{
                  '& .boxCheck:checked:after': {
                    display: 'block',
                  },
                }}
              />

            <p style={{ textDecoration: task.tasksProgress === 100 ? 'line-through' : 'none' }}>
              {task.taskName}
            </p>
          </div>
        ))}
      </div>
    </div>
  ))
) : (
  <Result
    status="404"
    title="No Tasks"
  />
)}
<div style={{paddingBottom:30}}></div>
      </Modal>
    </div>
  );
};

export default Card;