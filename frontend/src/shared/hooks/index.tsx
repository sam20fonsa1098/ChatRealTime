import React from 'react';
import { SocketProvider } from './Socket';

const Provider: React.FC = ({ children }) => {
  return (
    <SocketProvider>
      {children}
    </SocketProvider>
  );
}

export default Provider;