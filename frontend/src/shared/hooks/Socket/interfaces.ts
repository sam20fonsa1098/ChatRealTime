import { Socket } from 'socket.io-client';

export interface SocketProps {
  socket: Socket | undefined;
  sockets: Array<Socket>;
  urls: Array<string>;
  addSocket(url: string): void;
}