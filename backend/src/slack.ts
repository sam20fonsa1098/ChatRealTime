import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { namespaces, transformedNameSpaces } from './data';

const app = express();
app.use(cors());
app.use(express.json());

const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  socket.emit('namespaces', transformedNameSpaces);
});

namespaces.forEach(namespace => {
  io.of(namespace.endpoint).on('connection', (socket) => {
    const transformedRooms = namespace.rooms.map(room => {
      return {
        id: room.roomId,
        title: room.roomTitle,
        isPrivate: room.privateRoom,
        namespace: room.namespace
      }
    });
    socket.on('getRoom', () => {
      socket.emit('rooms', transformedRooms);
    })
    socket.emit('rooms', transformedRooms);
    socket.on('joinRoom', async (roomToJoin) => {
      socket.join(roomToJoin)
      const currentSockets = await io.of(namespace.endpoint).in(roomToJoin).fetchSockets();
      io.of(namespace.endpoint).in(roomToJoin).emit('updateUsers', currentSockets.length);
      const currentRom = namespace.rooms.find(cRoom => cRoom.roomTitle === roomToJoin);
      socket.emit('history', currentRom);
    });
    socket.on('messageToServer', (data) => {
      const currentRom = namespace.rooms.find(cRoom => cRoom.roomTitle === data.roomTitle);
      currentRom?.addMessage(data);
      io.of(namespace.endpoint).to(data.roomTitle).emit('messageToClient', data);
    });
    socket.on('leaveAllRooms', () => {
      const rooms = Array.from(socket.rooms);
      rooms.forEach(async (room) => {
        socket.leave(room);
        const currentSockets = await io.of(namespace.endpoint).in(room).fetchSockets();
        io.of(namespace.endpoint).in(room).emit('updateUsers', currentSockets.length);
      })
    })
  });
});

http.listen(3333, () => {
  console.log('Server running on port 3333');
});