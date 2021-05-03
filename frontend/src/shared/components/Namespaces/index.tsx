import React, { useEffect, useState, useCallback } from 'react';
import {NamespaceProps} from './interfaces';
import { useSocket } from '../../hooks/Socket';

const NameSpace: React.FC = () => {
  const { socket, addSocket } = useSocket();
  const [namespaces, setNamespaces] = useState<Array<NamespaceProps>>([]);

  const addSocketDomain = useCallback((domain: string) => {
    addSocket(`http://localhost:3333${domain}`);
  }, [addSocket]);

  useEffect(() => {
    if (socket) {
      socket.on('namespaces', (data: Array<NamespaceProps>) => {
        setNamespaces(data);
      })
    }
  }, [socket]);

  return (
    <section>
      {namespaces.map((namespace) => {
        return (
          <button key={namespace.endpoint} type="button" onClick={() => {
            addSocketDomain(namespace.endpoint);
          }}>
            <img src={namespace.img} alt={namespace.endpoint} />
          </button>
        );
      })}
    </section>
  );
};

export default NameSpace;