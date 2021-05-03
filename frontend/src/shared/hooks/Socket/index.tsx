import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {io, Socket} from 'socket.io-client';
import { SocketProps } from './interfaces';

const SocketContext = createContext<SocketProps>({} as SocketProps);

const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [sockets, setSockets] = useState<Array<Socket>>([]);
  const [urls, setUrls] = useState<Array<string>>([]);

  const addSocket = useCallback((url: string) => {
    setUrls(prevState => {
      const currentUrls = [...prevState];
      if (!currentUrls.includes(url)) {
        const currentSocket = io(url);
        setSockets(prevState => [...prevState, currentSocket]);
        currentUrls.push(url);
      } else {
        const index = currentUrls.findIndex(cUrl => cUrl === url);
        sockets[index].emit('getRoom', '');
      }
      return currentUrls;
    })
  }, [sockets]);

  useEffect(() => {
    if (!socket) {
      const currentSocket = io('http://localhost:3333');
      setSocket(currentSocket);
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{socket, sockets, urls, addSocket}}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = (): SocketProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within an SocketProvider');
  }
  return context;
}

export { SocketProvider, useSocket };
