import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { format } from 'date-fns';
import { FiUser, FiSend, FiClock, FiEdit } from 'react-icons/fi';
import { Root } from './styles';
import { ChatProps, Message } from './interface';
import { useSocket } from '../../hooks/Socket';

const Chat: React.FC = () => {
  const { sockets, urls } = useSocket();
  const [usersLength, setUsersLength] = useState(0);
  const [chat, setChat] = useState<ChatProps | undefined>(undefined);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Array<Message>>([]);

  const handleOnChangeMessage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleOnSendMessage = useCallback(() => {
    if (!chat) {
      return;
    }
    const index = urls.findIndex(url => url.includes(chat.namespace));
    const data = {
      message: message,
      socketId: sockets[index].id,
      date: new Date(),
      roomTitle: chat.roomTitle,
    }
    sockets[index].emit('messageToServer', data);
    setMessage('');
  }, [urls, sockets, chat, message]);

  useEffect(() => {
    sockets.forEach(socket => {
      socket.on('updateUsers', (data: number) => {
        setUsersLength(data)
      });
      socket.on('messageToClient', data => {
        setHistory(prevState => [...prevState, data])
      });
      socket.on('history', (data: ChatProps) => {
        setChat(data);
        setHistory(data.history);
      });
    })
  }, [sockets]);

  return (
    <Root>
      {chat && 
        <>
          <div>
            <h1>{chat.roomTitle}</h1>
            <div>
              <FiUser/>
              {usersLength && <h1>{usersLength}</h1>}
            </div>
          </div>
          <section>
            {history.map(message => {
              return (
                <aside id={message.socketId}>
                  <img src="data:image/jpeg;base64,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" alt="default"/>
                  <div>
                    <div>
                      <FiUser/>
                      <h2>{message.socketId}</h2>
                    </div>
                    <div>
                      <FiEdit/>
                      <h2>{message.message}</h2>
                    </div>
                    <div>
                      <FiClock/>
                      <h2>{format(new Date(message.date), 'yyyy/MM/dd hh-mm-ss')}</h2>
                    </div>
                  </div>

                </aside>
              );
            })}
          </section>
          <footer>
            <div>
              <input type="text" onChange={handleOnChangeMessage} value={message}/>
              <button type="button" onClick={handleOnSendMessage}>
                <FiSend/>
              </button>
            </div>
          </footer>
        </>
      }
    </Root>
  );
};

export default Chat;