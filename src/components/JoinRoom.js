// src/components/JoinRoom.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WebSocketContext } from '../WebsocketContext';

function JoinRoom() {
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();
  const ws = useContext(WebSocketContext);


  useEffect(() => {
    const token = localStorage.getItem('go-chat-token');

    if (token && (!ws.current || ws.current.readyState !== WebSocket.OPEN)) {
        console.log("Token available. Attempting to reconnect...")
        ws.current = new WebSocket('ws://localhost:8080/ws/chat?token=' + token);

        ws.current.onopen = () => console.log("WebSocket reconnected");

        ws.current.onerror = (error) => {
          console.error("WebSocket error:", error);
          navigate('/login'); // Redirect to login on error
        };

    }

    const handleMessage = (message) => {
        console.log('Message received from server: ', message.data)
        const data = JSON.parse(message.data);
        if (data.type === 'join_room' && data.success) {
          navigate('/chat', { state: { roomName } });
        }
    };

    if (ws.current) {
        ws.current.addEventListener('message', handleMessage);
    }

    return () => {};
  }, [ws, roomName, navigate])

  

  const handleJoin = (e) => {
    e.preventDefault();
    const currentWebSocket = ws.current;
    
    if (currentWebSocket && currentWebSocket.readyState === WebSocket.OPEN) {
        currentWebSocket.send(JSON.stringify({ type: 'join_room', room: roomName }));
    } else {
        console.error("WebSocket is not open. Attempting to reconnect...");
        const token = localStorage.getItem('token');
        if (token) {
            ws.current = new WebSocket('ws://localhost:8080/ws/chat?token=' + token);
        } else {
            navigate('/login');
        }
    }
  };

  return (
    <div>
    <form onSubmit={handleJoin}>
      <input 
        type="text" 
        value={roomName} 
        onChange={e => setRoomName(e.target.value)} 
        placeholder="Enter Chat Room Name" 
      />
      <button>Join Room</button>
      </form>
    </div>
  );
}

export default JoinRoom;
