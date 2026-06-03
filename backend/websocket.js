const WebSocket = require("ws");
const { getLatestState, getLogs } = require("./state");

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

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

module.exports = { setupWebSocket };
