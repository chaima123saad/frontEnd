import React, { useState } from 'react';
import '../loginpage/Login.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, useParams } from 'react-router-dom';
import img from '../loginpage/img/ffimg.png';
import img1 from './key1.png';
import img2 from './order.png';

import { ArrowLeftOutlined } from '@ant-design/icons';

function Login() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [resetStatus, setResetStatus] = useState(null); // New state variable for reset status
  const { resetToken } = useParams();
  const manager = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === '') {
      setPasswordError('Password is required!');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long!');
    }

    if (passwordError === '') {
      axios.post('http://localhost:2000/login/reset-password', {
        resetToken: resetToken,
        newPassword: password
      })
        .then(response => {
          setResetStatus('success'); // Update reset status to 'success' on successful reset
        })
        .catch(error => {
          console.log(error);
          setResetStatus('error'); // Update reset status to 'error' on error
        });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <img src={img} style={{ width: "60%" }} />

      <div style={{ position: 'absolute', top: '52%', left: '28%', transform: 'translate(-50%, -50%)' }}>
        <p style={{ color: 'white', fontSize: '1rem', paddingBottom: "0.5rem" ,letterSpacing:"2px",textAlign:"center"}}>Nice to see again</p>
        <p style={{ color: 'white', fontSize: '3.5rem' ,letterSpacing:"2px"}}>
          RESET PASSWORD
        </p>
        <p style={{ color: 'white', fontSize: '0.9rem', paddingTop: "3rem" ,letterSpacing:"1px",textAlign:"center"}}>
          Manage your work, deadlines, and team, all in one web application.<br/>
          Set and track schedules, validate tasks, and keep <br/>your project under control.
        </p>
        <div>
        </div>
      </div>
      
      <div className="container">
        <Link to={`/login`} style={{ display: "flex", paddingTop: 30, textDecoration: "none" }}>
          <ArrowLeftOutlined /> &nbsp;&nbsp;<p>Back to login</p>
        </Link>
        <div className="login-content" style={{ marginTop: "2.5rem" }}>
          {resetStatus === 'success' ? (
            <div style={{paddingTop:"5rem",paddingLeft:20}}>
              <img src={img2} style={{width:100,height:100}} />
              <h2 className="title">Reset Successful</h2>
              <p>Your password has been reset successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <img src={img1} style={{ width: 70, height: 70, marginBottom: 20 }} />

              <h2 className="title">Reset Password</h2>
              <p style={{ color: "gray", paddingBottom: 20 }}>
                Your new password must be different<br/> from previously used passwords.
              </p>

              <div className="input-div pass">
                <div className="i">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <div className="div">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder='Password'
                  />
                  <div className="error-message-mdp">{passwordError}</div>
                </div>
              </div>

                    <input type="submit" className="btn_" value="Reset" href="employe" />
                    </form>
                    )}
                    </div>
                    </div>
                    </div>
                    );
                    }
                    
                    export default Login;