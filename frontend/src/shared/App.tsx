import React from 'react';
import GlobalStyle from './global';
import { Root } from './styles';
import Provider from './hooks';
import Namespaces from './components/Namespaces';
import Rooms from './components/Rooms';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <Provider>
      <Root>
        <Namespaces/>
        <Rooms/>
        <Chat/>
      </Root>
      <GlobalStyle/>
    </Provider>
  );
}

export default App;
