import React, { useState} from 'react';
import './Login.css';
import axios from "axios";
import avatarImg from '../auth/padlock.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate,Link } from 'react-router-dom';
import {ArrowLeftOutlined}from '@ant-design/icons';
import img from './img/ffimg.png';
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
            const id = response.data.user._id;
            manager(`/employee/${id}`);
          }
        })
        .catch(error => {
          setError('Error occurred while logging in.');
          console.error(error);
        });
      }
  };

  return (
    <div style={{display:"flex"}} >
    <img src={img} style={{width:"60%"}}/>


    <div style={{ position: 'absolute', top: '52%', left: '28%', transform: 'translate(-50%, -50%)' }}>
        <p style={{ color: 'white', fontSize: '1rem', paddingBottom: "0.5rem" ,letterSpacing:"2px",textAlign:"center"}}>Nice to see again</p>
        <p style={{ color: 'white', fontSize: '3.5rem' ,letterSpacing:"2px"}}>
          WELCOME BACK
        </p>
        <p style={{ color: 'white', fontSize: '0.9rem', paddingTop: "3rem" ,letterSpacing:"1px",textAlign:"center"}}>
          Manage your work, deadlines, and team, all in one web application.<br/>
          Set and track schedules, validate tasks, and keep <br/>your project under control.
        </p>
        <div>
        </div>
      </div>


      <div className="container">
        
        <Link to={`/`} style={{display:"flex",paddingTop:30,textDecoration:"none"}}>
        <ArrowLeftOutlined /> &nbsp;&nbsp;<p>Go Home</p>
           </Link>
      
        <div className="login-content" style={{marginTop:"1.5rem"}}>
          <form onSubmit={handleSubmit} >
          <img src={avatarImg} style={{width:60,height:60}} />

            <h2 className="title">Log In</h2>
            
            <p style={{color:"gray",paddingBottom:20}}>Log in to your account-enjoy exclusive features<br/>  and many more. </p>

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
        <Link to={`/forgot-password`} style={{textDecoration:"none"}} className="toforgot">
          <p>Forgot Password ?</p>         
           </Link>
        </div>

      </div>
    
  );
}

export default Login;

