import React, { useEffect, useState } from "react";
import axios from "axios";
import {TeamOutlined,SolutionOutlined,CalendarOutlined, NumberOutlined,LeftCircleOutlined, CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import './Team.css';
const Team = () => {
  const { teamId } = useParams();
const {id}=useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);

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
      // Handle the case when teamId is null
      // Return an error message or redirect to an error page
    }
  }, [teamId]);

  const handleInputChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleUpdateTeam = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:2000/teams/${teamId}`, team)
      .then((response) => {
        console.log(response.data);
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">
          <Link to={`/manager/${id}/nav5/`} className="link">
            <LeftCircleOutlined className="returnBtn" />
          </Link>
          Edit Team
        </h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowBottom">
            <span className="userShowTitle">Team Details</span>
            <div className="userShowInfo">
              <TeamOutlined className="userShowIcon"/>
              <span className="userShowInfoTitle">{team.name}</span>
            </div>
            <div className="userShowInfo">
            <NumberOutlined className="userShowIcon"/>
            <span className="userShowInfoTitle"> {team._id}</span>
              </div>
            <div className="userShowInfo">
            <UserOutlined className="userShowIcon"/>
            <span className="userShowInfoTitle">{team._id}</span>
            </div>
            <div className="userShowInfo">
            <CalendarOutlined className="userShowIcon" />
            <span className="userShowInfoTitle"> {team.createdAt}</span>
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
                  value={team.name}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button className="TeamUpdateButton" onClick={handleUpdateTeam}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {updateSuccess && (
        <div className="popup">
          <CheckCircleOutlined className="valideIcon" />
          <span className="popupText">Team Updated Successfully</span>
        </div>
      )}
    </div>
  );
};

export default Team;
