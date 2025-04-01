const config = require("../config");
const commands = [];

function command({ pattern, type = "Other", desc, dontAddToCommandList = false, on }, func) {
  if (!dontAddToCommandList) {
    commands.push({ pattern, type, desc, func, on });
  }
}

command.all = () => commands;
async function execute(message) {
  for (const cmd of commands) {
    if (cmd.pattern && message.text.startsWith(`${config.PREFIX}${cmd.pattern}`)) {
      const match = message.text.replace(`${config.PREFIX}${cmd.pattern}`, "").trim();
      await cmd.func(message, match);  // ✅ Removed `return`
    }
  }

  for (const cmd of commands) {
    if (cmd.on === "text") {
      await cmd.func(message, message.text);  // ✅ Removed `return`
    }
  }
}


module.exports = { command, execute };
