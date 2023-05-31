import React, { useState} from 'react';
import './Login.css';
import axios from "axios";
import waveImg from './img/back.png';
import avatarImg from './img/padlock.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate,Link } from 'react-router-dom';
import img from './img/tasks.png';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

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

    if (email === '') {
      setEmailError('Email is required !');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format !');
    }

    if (password === '') {
      setPasswordError('Password is required !');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long !');
    }

      if (emailError === '' && passwordError === '') {
        axios.post('http://localhost:2000/login/', {
          email: email,
          password: password
        })
        .then(response => {
          console.log(response);
          if (response.data && response.data.user.role === 'manager') {
            const id = response.data.user._id;
            manager(`/manager/${id}`);
          } else if (response.data && response.data.user.role === 'owner'){
            const id = response.data.user._id;
            manager(`/owner/${id}`);
          }else if (response.data && response.data.user.role === 'employee'){
            console.log("error");
          }
        })
        .catch(error => {
          setError('Error occurred while logging in.');
          console.error(error);
        });
      }
  };

  return (
    <div>
      <div className="container">
      <img src={img} style={{ paddingLeft: "1.5rem",width:180,paddingTop:"1rem" }}/>
        <div className="login-content">
          <form onSubmit={handleSubmit} >
          <Link to={`/forgot-password`} className="link">
          <p>Forgot Password ?</p>         
           </Link>
            <div style={{display:'flex',gap:25}}>
            <img src={avatarImg} alt="avatar" style={{height:60}}/>
            <h2 className="title">Welcome</h2>
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

