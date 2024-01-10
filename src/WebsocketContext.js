import React, { createContext, useRef, useEffect } from 'react';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const ws = useRef(null);
  
    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8080/ws/chat');
  
      return () => {
        console.log('Closing WebSocket connection...');
        if (ws.current) {
          ws.current.close();
        }
      };
    }, []);
  
    return (
      <WebSocketContext.Provider value={ws}>
        {children}
      </WebSocketContext.Provider>
    );
  }; 