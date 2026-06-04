const WebSocket = require("ws");
const { getLatestState, getLogs, setRunning } = require("./state");

let wss;
function broadcast(message) {
  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function setupWebSocket(server) {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", (msg) => {
      const data = JSON.parse(msg);

      if (data.type === "command") {
        if (data.command === "start") {
          setRunning(true);
          console.log("Robot STARTED");
        }

        if (data.command === "stop") {
          setRunning(false);
          console.log("Robot STOPPED");
        }
      }
    });
    // Send INITIAL snapshot of state
    ws.send(
      JSON.stringify({
        type: "init",
        data: {
          state: getLatestState(),
          logs: getLogs(),
        },
      }),
    );

    ws.on("message", (msg) => {
      console.log("Received:", msg.toString());
    });
  });

  // expose broadcaster globally
  global.broadcast = (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };
}

module.exports = { setupWebSocket, broadcast };
