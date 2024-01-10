import './App.css';
import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import JoinRoom from './components/JoinRoom';
import {  BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WebSocketProvider } from './WebsocketContext';

function App() {
  return (
    <WebSocketProvider>
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/join" element={<JoinRoom />} />
        </Routes>
      </div>
    </Router>
    </WebSocketProvider>
  );
}

export default App;
