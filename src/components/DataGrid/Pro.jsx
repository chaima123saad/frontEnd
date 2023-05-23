import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    ContactsOutlined,
    TeamOutlined,
    InfoCircleOutlined,
    ExclamationCircleOutlined,
    DollarOutlined,
    LeftCircleOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import "./pro.css";
import edit from "./edit.jpg";
const Project = () => {
  const { projectId } = useParams();
  const {id}=useParams();
  const [project, setProject] = useState(null);
  const [teamId, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [data, setData] = useState([]);


  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2000/teams/')
      .then((Response) => {
        setTeams(Response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (projectId) {
      axios
        .get(`http://localhost:2000/projects/project/${projectId}`)
        .then((response) => {
          setProject(response.data);
          if (response.data.team) {
            setTeam(response.data.team);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      console.log("Project not found");
    
    }
  }, [projectId]);
  
  useEffect(() => {
    if (teamId) {
      axios
        .get(`http://localhost:2000/teams/${teamId}`)
        .then((Response) => {
          setData(Response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [teamId]);
  
  

  const handleInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:2000/projects/updateProject/${projectId}`, project)
      .then((response) => {
        console.log(response.data);
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">
          <Link to={`/manager/${id}/projects/`} className="link">
            <LeftCircleOutlined className="returnBtn" />
          </Link>
          Edit Project
        </h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowBottom">
            <div className="project_name">{project.name}</div>
            <div className="sub_name">#{project._id}</div>
            <span className="userShowTitle">Project Details</span>
            
            
            <div className="userShowInfo">
            <DollarOutlined className="userShowIcon"/>
            <span className="userShowInfoTitle">{project.budge}</span>
            </div>
            <div className="userShowInfo">
            
            <ExclamationCircleOutlined className="userShowIcon"/>
            <span className="userShowInfoTitle"> {project.priority}</span>
              </div>
              <div className="userShowInfo">
            <TeamOutlined className="userShowIcon" />
            <span className="userShowInfoTitle"> {data.name}</span>
              </div>
              <div className="userShowInfo">
            <ContactsOutlined className="userShowIcon"/>
            <span className="userShowInfoTitle"> {project.clientName}</span>
              </div>
              <div className="userShowInfo">
            <InfoCircleOutlined className="userShowIcon"/>
            <span className="userShowInfoTitle"> {project.description}</span>
              </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={project.name}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={project.clientName}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Budget</label>
                <input
                  type="text"
                  name="budge"
                  value={project.budge}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
            
              <div className="userUpdateItem">
        <label>Priority</label>
        <select
            name="priority"
            value={project.priority}
            onChange={handleInputChange}
            className="userUpdateInput"
        >
            <option value="">Select priority</option>
            {["low", "medium", "high"].map((option) => (
            <option key={option} value={option} disabled={option === project.priority}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
            ))}
        </select>
        </div>


        <div className="userUpdateItem">
        <label>Team</label>
        <select
            name="team"
            value={project.team}
            onChange={handleInputChange}
            className="userUpdateInput"
        >
            <option value="">Select team</option>
            {teams.map((team) => (
            <option key={team._id} value={team._id}>
                {team.name}
            </option>
            ))}
            </select>
            </div>

            <div className="userUpdateItem">
            <label>Description</label>
            <textarea
                name="description"
                value={project.description}
                onChange={handleInputChange}
                className="userUpdateInput"
                
            ></textarea>
            </div>

            </div>
            <div className="userUpdateRight">
                <img src={edit} style={{height:250}}/>
              <button className="userUpdateButton" onClick={handleUpdateProject}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {updateSuccess && (
        <div className="popup">
          <CheckCircleOutlined className="valideIcon" />
          <span className="popupText">Project Updated Successfully</span>
        </div>
      )}
    </div>
  );
};

export default Project;