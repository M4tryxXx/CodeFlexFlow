import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const clients = new Map<string, any>();
const activeChats = new Map<string, Set<string>>(); // Map of userId to set of chatIds

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket: any) => {
    const senderId = socket.handshake.query.senderId;
    clients.set(senderId, { socket, online: true });

    console.log(`User ${senderId} connected`);

    // Notify other users that this user is online
    socket.broadcast.emit("userStatus", { userId: senderId, online: true });

    // Handle request for user status
    socket.on("checkUserStatus", (receiverId: string) => {
      const recipient = clients.get(receiverId);
      const isOnline = recipient ? recipient.online : false;
      socket.emit("userStatus", { userId: receiverId, online: isOnline });
    });

    // Handle joining a chat
    socket.on("joinChat", (chatId: string) => {
      if (!activeChats.has(chatId)) {
        activeChats.set(chatId, new Set());
      }
      activeChats.get(chatId)!.add(senderId);

      // Notify other participants in the chat
      socket.broadcast
        .to(chatId)
        .emit("chatStatus", { userId: senderId, joined: true });
      socket.join(chatId);
    });

    // Handle leaving a chat
    socket.on("leaveChat", (chatId: string) => {
      if (activeChats.has(chatId)) {
        activeChats.get(chatId)!.delete(senderId);

        // Notify other participants in the chat
        socket.broadcast
          .to(chatId)
          .emit("chatStatus", { userId: senderId, joined: false });
        socket.leave(chatId);
      }
    });

    socket.on(
      "privateMessage",
      ({
        receiverId,
        content,
        chatId,
      }: {
        receiverId: string;
        content: any;
        chatId: string;
      }) => {
        console.log(`Message from ${senderId} to ${receiverId}: ${content}`);
        const recipientSocket = clients.get(receiverId);
        if (recipientSocket) {
          recipientSocket.emit("message", {
            fromUserId: senderId,
            content,
            chatId,
          });
        }
      }
    );

    socket.on("disconnect", () => {
      clients.set(senderId, { socket: null, online: false });
      console.log(`User ${senderId} disconnected`);

      // Notify other users that this user is offline
      socket.broadcast.emit("userStatus", { userId: senderId, online: false });

      // Remove user from all active chats
      activeChats.forEach((participants, chatId) => {
        if (participants.has(senderId)) {
          participants.delete(senderId);
          socket.broadcast
            .to(chatId)
            .emit("chatStatus", { userId: senderId, joined: false });
        }
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

// Add an empty export statement to ensure the file is treated as a module
export {};
