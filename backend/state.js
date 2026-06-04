let latestRobotState = null;
let recentLogs = [];
let isRunning = true;

function setRunning(value) {
  isRunning = value;
}

function getRunning() {
  return isRunning;
}
function setLatestState(state) {
  latestRobotState = state;
}

function getLatestState() {
  return latestRobotState;
}

function addLog(log) {
  recentLogs.push(log);

  // keep only last 100 logs (important interview point)
  if (recentLogs.length > 100) {
    recentLogs.shift();
  }
}

function getLogs() {
  return recentLogs;
}

module.exports = {
  setLatestState,
  getLatestState,
  addLog,
  getLogs,
  setRunning,
  getRunning,
};
