const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8000");

ws.on("open", () => {
  console.log("Connected");
});

ws.on("message", (data) => {
  console.log("Received:", data.toString());
});

ws.on("error", (err) => {
  console.error("Error:", err.message);
});

ws.on("close", () => {
  console.log("Disconnected");
});
