import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const port = process.env.PORT || 5002;

const users = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle user joining
  socket.on("join", (username) => {
    const userData = {
      id: socket.id,
      username: username,
    };

    users.set(socket.id, userData);
    io.emit("user-joined", userData);

    // Send list of existing users
    socket.emit("existing-users", Array.from(users.values()));
  });

  // Handle sending messages
  socket.on("send-message", (data) => {
    io.emit("receive-message", data);
  });

  // Handle typing indicator
  socket.on("typing", (data) => {
    socket.broadcast.emit("user-typing", data);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const userData = users.get(socket.id);
    if (userData) {
      users.delete(socket.id);
      io.emit("user-left", userData);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
