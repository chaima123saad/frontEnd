import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Collapse.css';
import { Button, Popconfirm ,Result ,Spin} from 'antd';
import {FieldTimeOutlined,ContainerOutlined,ExclamationCircleOutlined,DeleteOutlined} from "@ant-design/icons";

const CollapseList = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const { id } = useParams();
  const [openMemberId, setOpenMemberId] = useState(null);
  const [memberTasks, setMemberTasks] = useState([]);
  const [oumaymaTasks, setOumaymaTasks] = useState([]);

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
  }, [id]);

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
    if (openMemberId) {
      axios
        .get(`http://localhost:2000/tasks/${openMemberId}`)
        .then((response) => {
          console.log(response.data);
          if (Array.isArray(response.data.tasks)) {
            setMemberTasks(response.data.tasks);
          } else {
            setMemberTasks([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [openMemberId,memberTasks]);

  const handleCollapse = (memberId, e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL' || e.target.tagName === 'BUTTON') {
      e.stopPropagation();
      return;
    }
  
    setOpenMemberId((prevOpenMemberId) => (prevOpenMemberId === memberId ? null : memberId));
  };
  

  useEffect(() => {
    axios
      .get('http://localhost:2000/chatGpt/task-list')
      .then((response) => {
        
        if (response.data.listItems && response.data.listItems.length > 0) {
          console.log(response.data.listItems);
          const listItems = response.data.listItems;
          const tasks = listItems
            .split('\n')
            .filter((item) => item.trim() !== "");
  
          // Find the index of the first task item (starting with a number)
          const firstTaskIndex = tasks.findIndex((item) => /^[0-9]+\./.test(item));
          
          if (firstTaskIndex !== -1) {
            const trimmedTasks = tasks.slice(firstTaskIndex);
            setOumaymaTasks(trimmedTasks);
          } else {
            console.log('No task items found.');
          }
        } else {
          console.log('Empty listItems response.');
        }
        setLoading(false);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  
  
  useEffect(()=>{
    if(oumaymaTasks.length > 0){
      console.log('******',oumaymaTasks);}
  })
  
  const handleTaskCheck = async (task,member) => {
    try {
      const response = await axios.post(`http://localhost:2000/tasks/addTask`, { status: "toDo",name:task,priority:"high","users":member});
      if (response.status === 200) {
        console.log(`Task ${task} status updated to 'ToDo'`);
      } else {
        console.log('Failed to update task status');
      }
    } catch (error) {
      console.error(error);
    }
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
              <div style={{display:'flex',gap:"1rem"}}>
              <img
                src={member.profileImage}
                style={{ borderRadius: '50%', height: 50 }}
                alt="Member Avatar"
              />
              <div>
              <p style={{fontSize:17}}>{member.name}&nbsp;{member.lastName}</p>
              <p style={{color:"gray"}}>{member.speciality}</p>
              </div>
              </div>
            {openMemberId === member._id && (
              <div className="collapse-content">

                <div style={{display:'flex',gap:'2rem'}}>

                <div>
                  <div className='grayBorder1' style={{display:"flex",justifyContent:'space-between',marginBottom:15}}>
                   <p className='done'> Done </p>
                   <p style={{paddingRight:20,color:'#8b8b8b'}}><ExclamationCircleOutlined />&nbsp;&nbsp;Please check the tasks</p>
                  </div>
                  {memberTasks
                .filter((task) => task.status === 'completed')
                .map((task) => (
                  <div key={task._id} style={{marginLeft:5,display:'flex',gap:10,marginTop:5}}>
                    <input type='checkbox' id={task._id} className='check'/>
                    <label for={task._id}>{task.name}</label>
                  </div>
                ))}
                  </div>
                
              <div>
                <div className='grayBorder2' style={{marginBottom:15}}>
                  <p className='progres'>In Progress</p>
                </div>
                {memberTasks
          .filter((task) => task.status === 'inProgress')
          .map((task) => (
            <label key={task._id} style={{paddingLeft:20}}><FieldTimeOutlined style={{fontSize:22 ,color:"gray"}} />&nbsp;&nbsp;{task.name}</label>
          ))}
              </div>

        </div>
        <div className='grayBorder3' style={{display:"flex",justifyContent:'space-between',marginBottom:15}}>
          <p className='toDo'> To Do </p>
          <p style={{paddingRight:30,color:'#8b8b8b'}}>
            <ExclamationCircleOutlined />&nbsp;&nbsp;Please validate or modify the suggested tasks</p>

        </div>
        {memberTasks
          .filter((task) => task.status === 'toDo')
          .map((task) => (
            <label key={task._id} style={{paddingLeft:20}}>{task.name}</label>
          ))}
        <div style={{paddingLeft:20,paddingTop:20}}>
          <p className='suggestedtasks'>Suggested Tasks</p>
          <div>
    {loading ? (
      <div>Please wait...</div>
    ) : oumaymaTasks ? (
      oumaymaTasks.map((task, index) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ paddingLeft: 5, display: 'flex', gap: 10, paddingTop: 5 }}>
            <input type='checkbox' id={index} className='check' onChange={() => handleTaskCheck(task, member._id)} />
            <label key={index}>{task}</label>
          </div>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={(e) => {
              e.stopPropagation();
            }}
          >
            <button type="link" className='btnDelete'>Delete</button>
          </Popconfirm>
        </div>
      ))
    ) : (
      <div>No data</div>
    )}
  </div>

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



