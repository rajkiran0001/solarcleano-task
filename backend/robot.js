const { setLatestState, addLog } = require("./state");

const CENTER_LAT = 49.634473;
const CENTER_LON = 5.890937;
const RADIUS_M = 5;

const LAT_DEG_PER_M = 1 / 111320;
const LON_DEG_PER_M = 1 / (111320 * Math.cos((CENTER_LAT * Math.PI) / 180));

const RADIUS_LAT = RADIUS_M * LAT_DEG_PER_M;
const RADIUS_LON = RADIUS_M * LON_DEG_PER_M;

const MOVE_TICKS = 15;
const CHARGE_TICKS = 5;
const CYCLE = MOVE_TICKS + CHARGE_TICKS;

const SPEED_MS = +((2 * Math.PI * RADIUS_M) / MOVE_TICKS).toFixed(2);

let battery = 100;
let tick = 0;

function startRobotSimulation() {
  setInterval(() => {
    const phase = tick % CYCLE;
    const charging = phase >= MOVE_TICKS;

    const angle = charging ? 0 : (phase / MOVE_TICKS) * 2 * Math.PI;

    battery = charging
      ? Math.min(100, +(battery + 1.0).toFixed(1))
      : Math.max(0, +(battery - 0.3).toFixed(1));

    const state = {
      timestamp: new Date().toISOString(),
      battery,
      status: charging ? "charging" : "moving",
      speed: charging ? 0.0 : SPEED_MS,
      latitude: +(CENTER_LAT + RADIUS_LAT * Math.sin(angle)).toFixed(6),
      longitude: +(CENTER_LON + RADIUS_LON * Math.cos(angle)).toFixed(6),
    };

    // store latest state
    setLatestState(state);

    console.log("STATE:", state);

    // optionally generate logs
    if (Math.random() < 0.1) {
      const log = {
        timestamp: state.timestamp,
        message: "Random robot event",
      };

      addLog(log);

      console.log("LOG:", log);
    }

    tick++;
  }, 1000);

  console.log("Robot simulation started");
}

module.exports = { startRobotSimulation };
