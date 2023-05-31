import React, { useState } from 'react';
import '../loginpage/Login.css';
import axios from "axios";
import waveImg from '../loginpage/img/back.png';
import avatarImg from '../loginpage/img/padlock.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate ,Link} from 'react-router-dom';
import img from '../loginpage/img/tasks.png';
function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

 
  const manager = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === '') {
      setEmailError('Email is required !');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format !');
    }

 

      if (emailError === '') {
        axios.post('http://localhost:2000/login/forgot-password', {
          email: email,

        })
      }
  };

  return (
    <div>
      <div className="container">
      <img src={img} style={{ paddingLeft: "1.5rem",width:180,paddingTop:"1rem" }}/>
        <div className="login-content">
          
          <form onSubmit={handleSubmit} >
          <Link to={`/login`} className="link">
          <p>Return Login ?</p>         
           </Link>
            <div style={{display:'flex',gap:25}}>
            <img src={avatarImg} alt="avatar" style={{height:60}}/>
            <h2 className="title">Forgot Password</h2>
            </div>
            <div className="input-div one">
              <div className="i">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="div">
                <input type="text" className="input"  value={email} onChange={handleEmailChange} placeholder='Email'/>
                <div className="error-message-email"><br></br>{emailError}</div>
              </div>
            </div>
          
            <input type="submit" className="btn_" value="Login" href="employe" />
          </form>
          
          

        </div>
        <img src={waveImg} className='blue'/>
        </div>

      </div>
    
  );
}

export default Login;