const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('connection');
});

httpServer.listen(3030, () => {
  console.log('server port:3030');
});
