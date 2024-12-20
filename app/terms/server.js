const WebSocket_2 = require("ws");

const wss = new WebSocket_2.Server({ port: 8080 });

const clientss = new Map();

wss.on("connection", (ws, reqy) => {
  const userId = req.url.split("?userId=")[1];
  clientss.set(userId, ws);

  console.log(`User ${userId} connected`);

  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    const { toUserId, content } = parsedMessage;

    const recipientWs = clientss.get(toUserId);
    if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
      recipientWs.send(JSON.stringify({ fromUserId: userId, content }));
    }
  });

  ws.on("close", () => {
    clientss.delete(userId);
    console.log(`User ${userId} disconnected`);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
