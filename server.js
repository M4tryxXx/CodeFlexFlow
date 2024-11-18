const { user } = require("@nextui-org/react");
const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "172.20.10.2";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const clients = new Map();
let onlineUsers = 0;

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    const senderId = socket.handshake.query.senderId;
    const user_name = socket.handshake.query.username;
    // console.log(socket.handshake.query);
    clients.set(senderId, {
      user_name: user_name,
      socket,
      online: true,
      inChat: false,
      chatKey: "",
    });
    onlineUsers++;

    // Notify other users that this user is online
    socket.broadcast.emit("userLogged", {
      userId: senderId,
      user_name: user_name,
      online: true,
      inChat: true,
    });

    const connectedUsers = Array.from(clients?.values())
      .filter((client) => client.online)
      .map((client) => ({
        userId: client.socket.id,
        username: client.user_name,
      }));
    socket.broadcast.emit("connectedUsers", connectedUsers);
    // Broadcast the list of online users to all clients

    socket.broadcast.emit("onlineUsers", onlineUsers);

    // Handle request for user status
    socket.on("checkUserStatus", (receiverId) => {
      const recipient = clients.get(receiverId);
      // console.log(`User ${receiverId} is online: ${recipient.isOnline}`);
      if (!recipient) {
        socket.emit("userStatus", {
          userId: receiverId,
          user_name: "Unknown",
          online: false,
          inChat: false,
          chatKey: "",
        });

        return;
      }
      socket.emit("userStatus", {
        userId: receiverId,
        user_name: recipient.user_name,
        online: recipient.isOnline,
        inChat: recipient.inChat,
        chatKey: recipient.chatKey,
      });
    });

    // Handle See who is online
    socket.on("onlineUsers", () => {
      socket.emit("onlineUsers", onlineUsers);
    });

    socket.on("privateMessage", ({ receiverId, user_name, content }) => {
      const recipient = clients.get(receiverId);
      if (recipient && recipient.online) {
        recipient.socket.emit("message", {
          fromUserId: senderId,
          username: user_name,
          content,
        });
      }
    });

    // Handle typing events
    socket.on("typing", (receiverId) => {
      const recipient = clients.get(receiverId);
      if (recipient && recipient.online) {
        recipient.socket.emit("typing", {
          fromUser: user_name,
          to: receiverId,
        });
      }
    });

    socket.on("stopTyping", (receiverId) => {
      const recipient = clients.get(receiverId);
      if (recipient && recipient.online) {
        recipient.socket.emit("stopTyping", {
          fromUser: user_name,
          to: receiverId,
        });
      }
    });

    // Notify the other user when someone joins their chat
    socket.on("joinChat", (receiverId) => {
      const sender = clients.get(senderId);
      sender.inChat = true;
      sender.chatKey = receiverId;

      clients.set(senderId, sender);

      socket.broadcast.emit("userStatus", {
        userId: senderId,
        user_name: sender.user_name,
        online: sender.online,
        inChat: true,
        chatKey: receiverId,
      });
    });

    // Notify the other user when someone leaves their chat
    socket.on("leaveChat", (receiverId) => {
      const sender = clients.get(senderId);

      sender.inChat = true;
      sender.chatKey = "";

      clients.set(senderId, sender);

      socket.broadcast.emit("userStatus", {
        userId: senderId,
        user_name: user_name,
        online: sender.online,
        inChat: true,
        chatKey: "LEFT_CHAT_KEY_" + receiverId,
      });
    });

    socket.on("getConnectedUsers", () => {
      console.log("clients", clients);

      const connectedUsers = Array.from(clients?.values())
        .filter((client) => client.online)
        .map((client) => ({
          userId: client.socket.id,
          username: client.user_name,
        }));
      console.log("connectedUsers", connectedUsers);
      socket.emit("connectedUsers", connectedUsers);
    });

    socket.on("disconnect", () => {
      clients.set(senderId, {
        user_name,
        socket: null,
        online: false,
        inChat: false,
        chatKey: "",
      });
      // console.log(`User ${senderId} disconnected`);
      onlineUsers--;
      // Broadcast the updated list of online users to all clients
      const connectedUsers = Array.from(clients?.values())
        .filter((client) => client.online)
        .map((client) => ({
          userId: client.socket.id,
          username: client.user_name,
        }));

      socket.broadcast.emit("onlineUsers", onlineUsers);
      socket.broadcast.emit("connectedUsers", connectedUsers);
      // Notify other users that this user is offline

      socket.broadcast.emit("userLogged", {
        userId: senderId,
        user_name: user_name,
        online: false,
        inChat: false,
        chatKey: "",
      });
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on https://${hostname}:${port}`);
    });
});
