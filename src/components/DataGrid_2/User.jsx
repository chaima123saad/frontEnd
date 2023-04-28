import "./user.css";
import { Link, useParams } from "react-router-dom";
import Chart from "./Chart";
import { useEffect, useState } from "react";
import axios from "axios";

const Single = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const match = window.location.pathname.match(/^\/users\/(\w+)$/);
  const userId = match ? match[1] : null;
    useEffect(() => {
    axios
      .get(`http://localhost:2000/users/${userId}`)
      .then((response) => {
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

  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={user.profileImage} alt="avatar"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.numero}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {user.adress}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Genre:</span>
                  <span className="itemValue">{user.genre}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="ReturnLink">
        <Link to="/users" style={{ textDecoration: "none" }}>
              <div className="viewButton">Return</div>
            </Link>
        </div>
      
      </div>
    </div>
  );
};

export default Single;
