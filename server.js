const express = require(`express`);
const path = require(`path`);
// Require http for create a server
const http = require(`http`);
// Require socketio
const socketio = require(`socket.io`);

const app = express();
// Create server based on our app
const server = http.createServer(app);
// Create socketio instance based on server
const io = socketio(server);
// Set static folder route
app.use(express.static(path.join(__dirname, `public`)));

// Run io when client connects
io.on(`connection`, (socket) => {
  console.log("New WebSocket connection");
  // Welcome current user
  socket.emit(`message`, `Welcome to ChatIO`);

  // Broadcast when user connects
  socket.broadcast.emit(`message`, `A user has joined the chat`);

  // Runs when client disconnects
  socket.on(`disconnect`, () => {
    io.emit(`message`, `A user has left the chat`);
  });

  // Listen for chatMessage
  socket.on(`chatMessage`, (msg) => {
    io.emit(`message`, msg);
  });
});

const PORT = 3000 || process.env.PORT;

// Listen server at given PORT
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
