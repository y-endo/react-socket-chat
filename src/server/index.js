const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const session = require('express-session');
const path = require('path');
const uuid = require('node-uuid');
const fs = require('fs');

const store = {};

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
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
    store.userName = req.body['user-name'];
    store.sessionId = req.session.sessionId;
  }
  res.redirect('/');
});

app.get('*', (_, res) => {
  fs.readFile(path.resolve(__dirname, '../../public/index.html'), (_, data) => {
    const out = data
      .toString()
      .replace('$sessionId', store.sessionId ? `"${store.sessionId}"` : null)
      .replace('$userName', store.userName ? `"${store.userName}"` : null);
    res.send(out);
  });
});

io.on('connection', socket => {
  socket.on('join', room => {
    store.room = room;
    socket.join(room);
  });
  socket.on('message', message => {
    io.to(store.room).emit('message', message);
  });
});

httpServer.listen(3030, () => {
  console.log('server port:3030');
});
