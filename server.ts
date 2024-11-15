const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "192.168.0.127";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const clients = new Map<string, any>();
const chats = new Map<string, any>();
let onlineUsers = 0;

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket: any) => {
    const senderId = socket.handshake.query.senderId;
    const user_name = socket.handshake.query.username;
    // console.log(socket.handshake.query);
    clients.set(senderId, {
      user_name,
      socket,
      online: true,
      inChat: false,
      chatKey: "",
    });
    onlineUsers++;

    // Notify other users that this user is online
    socket.broadcast.emit("userStatus", {
      userId: senderId,
      user_name: user_name,
      online: true,
    });

    socket.broadcast.emit("onlineUsers", onlineUsers);

    // Handle request for user status
    socket.on("checkUserStatus", (receiverId: string) => {
      const recipient = clients.get(receiverId);
      // console.log(`User ${receiverId} is online: ${recipient.isOnline}`);
      socket.emit("userStatus", {
        userId: receiverId,
        user_name: recipient.userName,
        online: recipient.isOnline,
        inChat: recipient.inChat,
        chatKey: recipient.chatKey,
      });
    });

    // Handle See who is online
    socket.on("onlineUsers", () => {
      socket.emit("onlineUsers", onlineUsers);
    });

    socket.on(
      "privateMessage",
      ({ receiverId, content }: { receiverId: string; content: any }) => {
        const recipient = clients.get(receiverId);
        if (recipient && recipient.online) {
          recipient.socket.emit("message", { fromUserId: senderId, content });
        }
      }
    );

    // Handle typing events
    socket.on("typing", (receiverId: string) => {
      const recipient = clients.get(receiverId);
      if (recipient && recipient.online) {
        recipient.socket.emit("typing", { fromUserId: senderId });
      }
    });

    socket.on("stopTyping", (receiverId: string) => {
      const recipient = clients.get(receiverId);
      if (recipient && recipient.online) {
        recipient.socket.emit("stopTyping", { fromUserId: senderId });
      }
    });

    // Notify the other user when someone joins their chat
    socket.on("joinChat", (receiverId: string) => {
      const sender = clients.get(senderId);

      sender.inChat = true;
      sender.chatKey = receiverId;

      clients.set(senderId, sender);

      socket.broadcast.emit("userStatus", {
        userId: senderId,
        user_name: user_name,
        online: sender.online,
        inChat: true,
        chatKey: receiverId,
      });
    });

    // Notify the other user when someone leaves their chat
    socket.on("leaveChat", (receiverId: string) => {
      const sender = clients.get(senderId);

      sender.inChat = false;
      sender.chatKey = "";

      clients.set(senderId, sender);

      socket.broadcast.emit("userStatus", {
        userId: senderId,
        user_name: user_name,
        online: sender.online,
        inChat: false,
        chatKey: "",
      });
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
      socket.broadcast.emit("onlineUsers", onlineUsers);
      // Notify other users that this user is offline

      socket.broadcast.emit("userStatus", {
        userId: senderId,
        user_name: user_name,
        online: false,
        inChat: false,
        chatKey: "",
      });
    });
  });

  httpServer
    .once("error", (err: any) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
