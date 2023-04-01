// ForgotPassword.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add forgot password logic here
    console.log(`Email: ${email}`);
  }

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Enter your email address to reset your password:</p>
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
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;