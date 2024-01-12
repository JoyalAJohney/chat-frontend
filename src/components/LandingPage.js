import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="chat-window">
        <div className="login-panel">
          <h1>Real-Time Distributed Chat</h1>
          <span>Connect Instantly! Where every conversations is a new adventure!</span>
          <br />
          <br />
          <div className="form-button">
            <Link to="/signup"><button className="landing-button">Create a new Account</button></Link>
            <Link to="/login"><button className="landing-button">Login</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
