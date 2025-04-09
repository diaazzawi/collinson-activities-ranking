const {exec} = require("child_process");
const os = require("os");

const SERVER_CMD = "cd server && bun run dev";
const CLIENT_CMD = "cd client && bun run dev";

const startServer = () => {
  switch (os.platform()) {
    case "win32": // Windows
      exec(`start cmd /k "${SERVER_CMD}"`);
      break;
    case "darwin": // macOS
      exec(
        `osascript -e 'tell application "Terminal" to do script "${SERVER_CMD}"'`,
      );
      break;
    case "linux": // Linux
      exec(`gnome-terminal -- bash -c "${SERVER_CMD}; exec bash"`);
      break;
    default:
      console.error("Unsupported platform for server!");
  }
};

const startClient = () => {
  switch (os.platform()) {
    case "win32": // Windows
      exec(`start cmd /k "${CLIENT_CMD}"`);
      break;
    case "darwin": // macOS
      exec(
        `osascript -e 'tell application "Terminal" to do script "${CLIENT_CMD}"'`,
      );
      break;
    case "linux": // Linux
      exec(`gnome-terminal -- bash -c "${CLIENT_CMD}; exec bash"`);
      break;
    default:
      console.error("Unsupported platform for client!");
  }
};

startServer();
startClient();
