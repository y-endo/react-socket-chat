const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const session = require('express-session');
const path = require('path');
const uuid = require('node-uuid');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
  if (!req.session.userName && req.body['user-name']) {
    req.session.userName = req.body['user-name'];
  }

  res.redirect('/');
});

app.post('/validate_session', (req, res) => {
  res.json({
    result: req.body.sessionId === req.session.sessionId && req.body.userName === req.session.userName
  });
});

app.get('*', (req, res) => {
  fs.readFile(path.resolve(__dirname, '../../public/index.html'), (_, data) => {
    const out = data
      .toString()
      .replace('$sessionId', req.session.sessionId ? `"${req.session.sessionId}"` : null)
      .replace('$userName', req.session.userName ? `"${req.session.userName}"` : null);
    res.send(out);
  });
});

io.on('connection', socket => {
  let room = null;

  // 入室
  socket.on('join', roomId => {
    room = roomId;
    socket.join(room);
  });
  // 退室
  socket.on('leave', roomId => {
    socket.leave(roomId);
  });
  // チャット受信+送信
  socket.on('message', message => {
    if (room) io.to(room).emit('message', message);
  });
  // ブロードキャストチャット
  socket.on('messageBroadcast', message => {
    if (room) socket.broadcast.to(room).emit('message', message);
  });
});

httpServer.listen(3030, () => {
  console.log('server port:3030');
});
