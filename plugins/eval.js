const { command } = require("../lib/plugins");

command(
  {
    pattern: "eval",
    desc: "Evaluate JavaScript code",
    type: "utility",
  },
  async (message, match) => {
    if (message.userName !== "H4KI_XER") {
      return await message.reply("fuck off, You are not my owner.");
    }

    if (!match) {
      return await message.reply("Please provide JavaScript code to evaluate.");
    }

    const code = match;

    try {
      const result = await (async () => eval(`(async () => { ${code} })()`))();
      const output =
        typeof result === "string"
          ? result
          : JSON.stringify(result, null, 2) || "No output";

      await message.reply(output);
    } catch (error) {
      await message.reply(`❌ Error: ${error.message}`);
    }
  }
);
command(
  {
    on: "text",
    dontAddToCommandList: true,
  },
  async (message) => {
    if (!message.text.startsWith("$")) return;

    const code = message.text.slice(1);

    try {
      const result = await (async () => eval(`(async () => { ${code} })()`))();
      const output =
        typeof result === "string"
          ? result
          : JSON.stringify(result, null, 2) || "No output";

      message.reply(output);
    } catch (error) {
      message.reply(`❌ Error: ${error.message}`);
    }
  }
);
