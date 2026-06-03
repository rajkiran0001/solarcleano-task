let latestRobotState = null;
let recentLogs = [];

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
};
