export default class Room{
  roomId: number;
  roomTitle: string;
  namespace: string;
  privateRoom: boolean;
  history: Array<string>
  constructor(
    roomId: number, 
    roomTitle: string, 
    namespace: string, 
    privateRoom: boolean = false){
      this.roomId = roomId;
      this.roomTitle = roomTitle;
      this.namespace = namespace;
      this.privateRoom = privateRoom;
      this.history = [];
  }
  addMessage(message: string){
      this.history.push(message);
  }
  clearHistory(){
      this.history = [];
  }
}
