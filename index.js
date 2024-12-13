const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User  joined room: ${room}`);
  });

  socket.on("chatMessage", (msg) => {
    io.to(msg.room).emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User  disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
