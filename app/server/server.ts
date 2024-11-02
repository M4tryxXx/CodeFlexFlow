const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const ioo = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
  },
});

const clients = new Map<string, any>();

ioo.on("connection", (socket: any) => {
  const senderId = socket.handshake.query.senderId;
  clients.set(senderId, socket);

  console.log(`User ${senderId} connected`);

  socket.on("message", (message: any) => {
    const { toUserId, fromUserId, content } = message;
    const recipientSocket = clients.get(toUserId);
    if (recipientSocket) {
      recipientSocket.emit("message", { fromUserId: fromUserId, content });
    }
  });

  socket.on("disconnect", () => {
    clients.delete(senderId);
    console.log(`User ${senderId} disconnected`);
  });
});

httpServer.listen(5050, () => {
  console.log("Socket.IO server is running on http://localhost:5050");
});
