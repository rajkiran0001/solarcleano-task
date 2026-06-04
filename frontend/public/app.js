const ws = new WebSocket("ws://localhost:8000");

let logs = [];

ws.onopen = () => {
  console.log("connected");
};

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  if (msg.type === "init") {
    document.getElementById("telemetry").innerText = JSON.stringify(
      msg.data.state,
      null,
      2,
    );

    logs = msg.data.logs;
    renderLogs();
  }

  if (msg.type === "telemetry") {
    document.getElementById("telemetry").innerText = JSON.stringify(
      msg.data,
      null,
      2,
    );
  }

  if (msg.type === "log") {
    logs.push(msg.data);
    renderLogs();
  }
};

function renderLogs() {
  const container = document.getElementById("logs");
  container.innerHTML = logs
    .map((l) => `<div>${l.timestamp} - ${l.message}</div>`)
    .join("");
}

function startRobot() {
  ws.send(
    JSON.stringify({
      type: "command",
      command: "start",
    }),
  );
}

function stopRobot() {
  ws.send(
    JSON.stringify({
      type: "command",
      command: "stop",
    }),
  );
}
