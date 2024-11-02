const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const ioo = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

ioo.on("connection", async (socket: any) => {
  console.log("User connected");

  socket.on("message", (message: any) => {
    console.log(`Received message: ${message}`);
    socket.send(`You sent: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(8080, () => {
  console.log("WebSocket server is running on ws://localhost:3000");
});
