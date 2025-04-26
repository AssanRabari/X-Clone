import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { ExitStatus } from "typescript";
import { v4 as uuidv4 } from "uuid";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const onlineUsers = [];

const addUser = (username, socketId) => {
  const isExist = onlineUsers.find((user) => user.socketId === socketId);

  if (!isExist) {
    onlineUsers.push({ username, socketId });
  }
};

const removeUser = () => {
  onlineUsers = onlineUsers.filter((user) => user.socketId != socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("newUser", (username) => {
      addUser(username, socket.id);
    });

    socket.on("sendNotification", ({ recieverUsername, data }) => {
      const reciever = getUser(recieverUsername);

      io.to(reciever.socketId).emit("getNotification", {
        id: uuidv4(),
        ...data,
      });
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
