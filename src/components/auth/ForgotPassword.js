import React, { useState } from 'react';
import '../loginpage/Login.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import img from '../loginpage/img/ffimg.png';
import img1 from './padlock.png';
import img2 from './message.png';
function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Added success state

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const manager = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === '') {
      setEmailError('Email is required!');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format!');
    }

    if (emailError === '') {
      try {
        await axios.post('http://localhost:2000/login/forgot-password', {
          email: email,
        });

        setSuccess(true); // Update success state

      } catch (error) {
        setError('Failed to send reset instructions!');
      }
    }
  };

  return (
    <div style={{ display: "flex" }} >
      <img src={img} style={{ width: "60%" }} />

      <div style={{ position: 'absolute', top: '52%', left: '28%', transform: 'translate(-50%, -50%)' }}>
        <p style={{ color: 'white', fontSize: '1rem', paddingBottom: "0.5rem" ,letterSpacing:"2px",textAlign:"center"}}>Nice to see again</p>
        <p style={{ color: 'white', fontSize: '3.5rem' ,letterSpacing:"2px"}}>
        FORGOT PASSWORD

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
          <ArrowLeftOutlined /> &nbsp;&nbsp;<p>Back to log in</p>
        </Link>
        <div className="login-content">

          {success ? (
            <div style={{paddingLeft:30}}>
              <img src={img2} style={{width:100,height:100}}/>
              <h2 className="title">Check your email</h2>
              <p>We sent a password reset link to </p>
              <p style={{color:"gray"}}>{email}</p>
              <form onSubmit={handleSubmit} >
              <input style={{backgroundColor:"white",border:"none",cursor:"pointer",paddingTop:30, color:"#545454"}} type="submit" value="Didn't receive the email ? Click to resend" href="employe" />
              </form>
            </div>
          ) : (
            <form onSubmit={handleSubmit} >
              <img src={img1} style={{ width: 65, height: 65 }} />

              <h2 className="title">Forgot Password</h2>
              <p style={{ color: "gray", paddingBottom: 20 }}>
                No worries, we'll send you reset instructions.
              </p>

              <div className="input-div one">
                <div className="i">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="div">
                  <input type="text" className="input" value={email} onChange={handleEmailChange} placeholder='Email' />
                  <div className="error-message-email"><br></br>{emailError}</div>
                </div>
              </div>

              <input type="submit" className="btn_" value="Reset password" href="employe" />
            </form>
          )}

        </div>
      </div>

    </div>
  );
}

export default Login;
