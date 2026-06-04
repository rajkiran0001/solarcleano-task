const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8000");

ws.on("open", () => {
  console.log("Connected");
});

setTimeout(() => {
  console.log("Sending STOP");
  ws.send(
    JSON.stringify({
      type: "command",
      command: "stop",
    }),
  );
}, 5000);

setTimeout(() => {
  console.log("Sending START");
  ws.send(
    JSON.stringify({
      type: "command",
      command: "start",
    }),
  );
}, 10000);

ws.on("message", (data) => {
  console.log("Received:", data.toString());
});

ws.on("error", (err) => {
  console.error("Error:", err.message);
});

ws.on("close", () => {
  console.log("Disconnected");
});
