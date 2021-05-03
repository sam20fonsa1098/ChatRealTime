export interface Message {
  date: Date;
  message: string;
  socketId: string;
}

export interface ChatProps {
  history: Array<Message>;
  namespace: string;
  roomId: string;
  roomTitle: string;
}