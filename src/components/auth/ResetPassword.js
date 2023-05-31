import React, { useState } from 'react';
import '../loginpage/Login.css';
import axios from "axios";
import waveImg from '../loginpage/img/back.png';
import avatarImg from '../loginpage/img/padlock.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate,Link, useParams } from 'react-router-dom';
import img from '../loginpage/img/tasks.png';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
 const {resetToken}=useParams();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };
  const manager = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

  

    if (password === '') {
      setPasswordError('Password is required !');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long !');
    }

      if ( passwordError === '') {
        axios.post('http://localhost:2000/login/reset-password', {
            resetToken: resetToken,
            newPassword: password
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
          <p> Return Login ?</p>         
           </Link>
            <div style={{display:'flex',gap:25}}>
            <img src={avatarImg} alt="avatar" style={{height:60}}/>
            <h2 className="title">Reset Password</h2>
            </div>
          
            <div className="input-div pass">
              <div className="i">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <div className="div">
                <input type="password" className="input" 
                value={password} onChange={handlePasswordChange}  placeholder='Pasword'/>
                <div className="error-message-mdp">{passwordError}</div>

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
