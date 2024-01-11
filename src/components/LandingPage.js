import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="login-section">
        <div className="login-panel">
          <h1>Real-Time Distributed Chat</h1>
          <p>Connect and communicate in real time across the world</p>
          <br />
          <br />
          <div className="auth-buttons">
            <Link to="/login"><button className="landing-button">Login</button></Link>
            <Link to="/signup"><button className="landing-button">Signup</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
