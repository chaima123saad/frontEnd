// Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/login.css';
import img from "../../images/12.png";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  }

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <div className="login-container">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>Forgot your password? <a href="/forgot-password">Reset it here</a></p>
        </div>
        <div className="image-container">
          <img src={img} alt="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;