import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RightCircleOutlined, ClockCircleOutlined, BarsOutlined } from "@ant-design/icons"; 
import { Progress, Avatar, Tooltip } from 'antd';
import "./MyProject.css";
import { Dropdown, message, Space,Button, Modal,Result ,Empty} from 'antd';

import img from "../Tasks/checklist.png";
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

  const handleOpenModal = (projectId) => {
    localStorage.setItem('projectId', projectId);
    setOpen(true);
  };
  const { id } = useParams();

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
    const id = localStorage.getItem('projectId');
    axios.get(`http://localhost:2000/projects/${id}/tasks`)
      .then(response => {
        setProjectTasks(response.data);
        const userIds = response.data.map(task => task.users[0]);
        console.log(userIds);
        
        const userRequests = userIds.map(userId => (
          axios.get(`http://localhost:2000/users/${userId}`)
        ));

        Promise.all(userRequests)
          .then(responses => {
            const usersData = responses.map(response => response.data);
            setUsers(usersData);
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
  if (users) {
 console.log("users : ",users);
  }
}, []);

useEffect(() => {
  if (team) {
 console.log("team : ",team);
  }
}, [users]);
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
        width={800}
        footer={null}
      >
    <p className='projectName'>{projectOpen.name}</p>
    <p style={{fontSize:18}}>{team ? team.name : "No team name available"}</p>
<hr/>
{users.length > 0 ? (
  users.map((user, index) => (
    <div key={index} className="taskContent">
      <div style={{ display: "flex", gap: "1rem" }}>
        <img src={user.profileImage} style={{ width: 40, height: 40, borderRadius: "50%" }} />
        <div style={{ paddingRight: 20, borderRight: "2px solid white" }}>
          <p style={{ fontWeight: "600" }}>{user.name}</p>
          <p>{user.speciality}</p>
        </div>
        {projectTasks[index] && (
          <div className='class1'>
          <p>{projectTasks[index].name}</p>
          <p className='statusTask'>{projectTasks[index].status}</p>
          </div>
        )}
      </div>
    </div>
  ))
) : (
  <Result
  status="404"
  title="No Tasks"
/>
)}

      </Modal>
    </div>
  );
};

export default Card;