const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const session = require('express-session');
const path = require('path');
const uuid = require('node-uuid');
const fs = require('fs');

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
);

app.use('/assets', express.static(path.resolve(__dirname, '../../public/assets')));

app.post('/login', (req, res) => {
  if (!req.session.sessionId) {
    req.session.sessionId = uuid.v4();
  }
  res.redirect('/');
});

app.get('*', (req, res) => {
  fs.readFile(path.resolve(__dirname, '../../public/index.html'), (_, data) => {
    const sessionId = req.session.sessionId;
    res.send(data.toString().replace('$sessionId', sessionId ? `"${sessionId}"` : null));
  });
});

io.on('connection', socket => {
  socket.on('message', message => {
    io.emit('message', message);
  });
});

httpServer.listen(3030, () => {
  console.log('server port:3030');
});
