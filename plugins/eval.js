const { command } = require("../lib/plugins");

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
