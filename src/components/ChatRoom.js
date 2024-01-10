import React, { useState, useEffect, useContext } from 'react';
import { WebSocketContext } from '../WebsocketContext';
import { useLocation, useNavigate } from 'react-router-dom';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const roomName = location.state?.roomName;
  const ws = useContext(WebSocketContext);

  useEffect(() => {
    const currentWebSocket = ws.current;
    const roomName = location.state?.roomName;  
    if (!roomName) {
        navigate('/join');
        return;
    }

    currentWebSocket.onmessage = (message) => {
      console.log('Message received from server:', message);
      const data = JSON.parse(message.data);
      setMessages(prevMessages => [...prevMessages, data]);
    };

    return () => {};
  }, [location.state, ws, navigate]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      ws.current.send(JSON.stringify({ type: 'chat_message', 'room': roomName, content: input }));
      setInput('');
    }
  };

  const leaveRoom = () => {
    ws.current.send(JSON.stringify({ type: 'leave_room', room: roomName }));
    navigate('/join');
  };

  return (
    <div className="chat-room">
      <div className="chat-room-header">
        <h2>Chat Room: {roomName}</h2>
        <button className="leave-room-button" onClick={leaveRoom}>Leave Room</button>
      </div>
      <div className="message-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="message-header">
              <span className="sender-name">{msg.senderName}</span>
              <span className="server-name">server: {msg.server}</span>
            </div>
            <div className="message-content">{msg.content}</div>
            <div className="message-footer">
              {new Date().toLocaleTimeString()} 
            </div>
          </div>
        ))}
      </div>
      <div className="chat-room-footer">
       <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="message-input"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
