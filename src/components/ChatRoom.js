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

  const username = localStorage.getItem('go-chat-username');

  useEffect(() => {
    const currentWebSocket = ws.current;
    const roomName = location.state?.roomName;  
    if (!roomName) {
        navigate('/join');
        return;
    }

    const handleMessage = (message) => {
      const data = JSON.parse(message.data);
      setMessages(prevMessages => [...prevMessages, data]);
    };

    const handleClose = () => {
      const errorMessage = 'WebSocket connection terminated. Please try joining again.'
      navigate('/join', { state: { errorMessage } });
    };

    if (currentWebSocket) {
      currentWebSocket.onmessage = handleMessage;
      currentWebSocket.onclose = handleClose;
    }

    return () => {
      if (currentWebSocket) {
        currentWebSocket.onmessage = null;
        currentWebSocket.onclose = null;
      }
    };
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
    <div className="bg-container">
      <div className="chat-room">
        <div className="chat-room-header">
          <h3>Chat Room: {roomName}</h3>
          <button className="leave-room-button" onClick={leaveRoom}>Leave Room</button>
        </div>
      <div className="message-box">
        {messages.map((msg, index) => {
          const isJoiningMessage = msg.type === 'join_room';
          const isOwnMessage = msg.senderName === username;
          if (isJoiningMessage) {
            if (isOwnMessage) return;
            return (
              <div key={index} className="join-message">
                {msg.senderName} joined from server {msg.server} 🎉
              </div>
            );
          }
          const messageClass = isOwnMessage ? "message own-message" : "message";
          return (
            <div key={index} className={messageClass}>
              <div className="message-header">
                {isOwnMessage ? <span></span> : <span className="sender-name">{msg.senderName}</span>}
              </div>
              <div className="message-content">{msg.content}</div>
              <div className="message-footer">
                {new Date().toLocaleTimeString()} 
              </div>
            </div>
          )})}
      </div>
      <div className="chat-room-footer">
       <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="message-input"
          placeholder='Enter your message'
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      </div>
    </div>
  );
}

export default ChatRoom;
