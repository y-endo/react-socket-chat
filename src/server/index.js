const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const session = require('express-session');
const path = require('path');
const uuid = require('node-uuid');
const fs = require('fs');
const apolloServer = require('./graphql');

apolloServer.applyMiddleware({ app });

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

app.get('/logout', (req, res) => {
  req.session.sessionId = null;
  req.session.userName = null;

  res.redirect('/login');
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

  // チャットルーム作成
  socket.on('addRoom', () => {
    socket.emit('addRoom');
  });

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
  socket.on('addMessage', message => {
    if (room) io.to(room).emit('addMessage', message);
  });
  // ブロードキャストチャット
  socket.on('addMessageBroadcast', message => {
    if (room) socket.broadcast.to(room).emit('addMessage', message);
  });
});

httpServer.listen(3030, () => {
  console.log('http-server ready at http://localhost:3030');
  console.log(`🚀 Server ready at http://localhost:3030${apolloServer.graphqlPath}`);
});
