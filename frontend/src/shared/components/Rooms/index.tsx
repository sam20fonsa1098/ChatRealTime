import React, { useEffect, useState, useCallback } from 'react';
import { FiLock, FiGlobe } from 'react-icons/fi';
import { Root } from './styles';
import { Room } from './interfaces';
import { useSocket } from '../../hooks/Socket';

const Rooms: React.FC = () => {
  const { sockets, urls } = useSocket();
  const [rooms, setRooms] = useState<Array<Room>>([]);

  const handleOnJoinRoom = useCallback((room: Room) => {
    const index = urls.findIndex(url => {
      return url.includes(room.namespace);
    });
    sockets.forEach((socket) => {
      socket.emit('leaveAllRooms', '')
    })
    sockets[index].emit('joinRoom', room.title);
  }, [urls, sockets]);

  useEffect(() => {
    sockets.forEach(socket => {
      socket.on('rooms', (data: Array<Room>) => {
        setRooms(data);
      })
    })
  }, [sockets]);

  return(
    <Root>
      {rooms.length > 0 && <h1>{rooms[0].namespace.replace('/', '')}</h1>}
      {rooms.map((room) => {
        return (
          <button type="button" key={room.id} onClick={() => {handleOnJoinRoom(room)}}>
            <h2>{room.title}</h2>
            {room.isPrivate ? <FiLock/> : <FiGlobe/>}
          </button>
        );
      })}
    </Root>
  );
};

export default Rooms;