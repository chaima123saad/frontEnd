import "./user.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { LeftCircleOutlined,ManOutlined,WomanOutlined,CheckCircleOutlined,UserOutlined, CalendarOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

const Single = () => {
  const [user, setUser] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false); // State variable for update success message
  const [loading, setLoading] = useState(true);
  const match = window.location.pathname.match(/^\/manager\/(\w+)\/users\/(\w+)$/);
  const managerId = match ? match[1] : null;
  const userId = match ? match[2] : null;  

useEffect(() => {
    axios
      .get(`http://localhost:2000/users/${userId}`)
      .then((response) => {
        console.log(userId);
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    // Send the updated user data to the server for updating the user record
     axios.put(`http://localhost:2000/users/updateUser/${userId}`, user)
       .then((response) => {
         console.log(response.data);
         setUpdateSuccess(true);
         setTimeout(() => {
          setUpdateSuccess(false);
        }, 1500);
       })
       .catch((error) => {
         console.log(error);
    //     // Handle error
       });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">
        <Link to={`/manager/${managerId}/users`} className="link">
          <LeftCircleOutlined className="returnBtn"/>
          </Link>
          Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={user.profileImage} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.name}</span>
              <span className="userShowUserTitle">{user.role}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <UserOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{user.name} {user.lastName}</span>
            </div>
            <div className="userShowInfo">
        {user.genre === "Homme" ? (
          <ManOutlined className="userShowIcon" />
        ) : (
          <WomanOutlined className="userShowIcon" />
        )}
        <span className="userShowInfoTitle">{user.genre}</span>
      </div>
      <div className="userShowInfo">
              
              <CalendarOutlined className="userShowIcon"/>
              <span className="userShowInfoTitle">{user.birthDate}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{user.numero}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <EnvironmentOutlined className="userShowIcon"/>
              <span className="userShowInfoTitle">{user.adress}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className
="userUpdateForm">
<div className="userUpdateLeft">
  <div className="userUpdateItem">
    <label>First Name</label>
    <input
      type="text"
      name="name"
      value={user.name}
      onChange={handleInputChange}
      className="userUpdateInput"
    />
  </div>
  <div className="userUpdateItem">
    <label>Last Name</label>
    <input
      type="text"
      name="lastName"
      value={user.lastName}
      onChange={handleInputChange}
      className="userUpdateInput"
    />
  </div>
  <div className="userUpdateItem">
    <label>Email</label>
    <input
      type="text"
      name="email"
      value={user.email}
      onChange={handleInputChange}
      className="userUpdateInput"
    />
  </div>
  <div className="userUpdateItem">
    <label>Phone</label>
    <input
      type="text"
      name="numero"
      value={user.numero}
      onChange={handleInputChange}
      className="userUpdateInput"
    />
  </div>
  <div className="userUpdateItem">
    <label>Address</label>
    <input
      type="text"
      name="adress"
      value={user.adress}
      onChange={handleInputChange}
      className="userUpdateInput"
    />
  </div>
</div>
<div className="userUpdateRight">
  <div className="userUpdateUpload">
    <img className="userUpdateImg" src={user.profileImage} alt="" />
    <input type="file" id="file" style={{ display: "none" }} />
  </div>
  <button className="userUpdateButton" onClick={handleUpdateUser}>
    Update
  </button>
</div>
</form>
</div>
</div>
{updateSuccess && (
        <div className="popup">
          <CheckCircleOutlined className="valideIcon"/>&nbsp;&nbsp;
          <span className="popupText">User Successfully Updated</span>
        </div>
      )
      }
</div>
);
};

export default Single;

