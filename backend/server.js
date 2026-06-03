const http = require("http");
const express = require("express");
const cors = require("cors");

const { setupWebSocket } = require("./websocket");
const { startRobotSimulation } = require("./robot");

const app = express();

// Middleware (optional but useful for debugging)
app.use(cors());
app.use(express.json());

// Simple health check (VERY useful for testing)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Create HTTP server
const server = http.createServer(app);

// Attach WebSocket server
setupWebSocket(server);

// Start robot simulation loop
startRobotSimulation();

// Start server
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
