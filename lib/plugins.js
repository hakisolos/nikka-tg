const config = require("../config");
const commands = [];

function command({ pattern, type = "Other", desc, dontAddToCommandList = false }, func) {
  if (!dontAddToCommandList) {
    commands.push({ pattern, type, desc, func });
  }
}

command.all = () => commands;

async function execute(message) {
  for (const cmd of commands) {
    if (cmd.pattern && message.text.startsWith(`${config.PREFIX}${cmd.pattern}`)) {
      const match = message.text.replace(`${config.PREFIX}${cmd.pattern}`, "").trim();
      return await cmd.func(message, match);
    }
  }

  for (const cmd of commands) {
    if (cmd.on === "text") {
      return await cmd.func(message, message.text);
    }
  }
}

module.exports = { command, execute };
