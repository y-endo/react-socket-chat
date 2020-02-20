import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import App from './App';

// const socket: SocketIOClient.Socket = io();

ReactDOM.render(<App />, document.querySelector('#app'));
