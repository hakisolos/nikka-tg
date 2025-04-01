const { command } = require("../lib/plugins");
const config = require("../config");
const { tiny } = require("../lib/fancy_font/fancy");

command(
  { pattern: "ping", desc: "Check bot response time", type: "info" },
  async (message) => {
    const start = Date.now();
    const sentMessage = await message.send("Pinging...");
    const ping = Date.now() - start;
    await message.edit(sentMessage.message_id, `Pong! ${ping}ms`);
    await message.react("⚡");
  }
);

command(
  { pattern: "alive", desc: "Alive message", type: "info" },
  async (message) => {
    const ping = Date.now() - message.date;
    const caption = `╭━━━━━━━━━━━━━━━╮
┃    NIKKA MD STATUS    
┣━━━━━━━━━━━━━━━┻━╮
┃  User      : ${message.userName}
┃  Creator   : H4KI XER
┃  Platform  : Linux
┃  Latency   : ${ping}ms
╰━━━━━━━━━━━━━━━━━╯`;

    await message.sendPhoto("https://files.catbox.moe/mabris.jpg", { caption });
  }
);

command(
  { pattern: "menu", desc: "Shows all commands", type: "info" },
  async (message, match) => {
    try {
      if (match) {
        for (let cmd of command.all()) {
          if (cmd.pattern === match) {
            return message.reply(
              `\`\`\`Command: ${config.PREFIX}${cmd.pattern}\nDescription: ${cmd.desc}\`\`\``
            );
          }
        }
      } else {
        let { PREFIX } = config;
        const title = await tiny("Nikka MD");

        let menu = `╭─𖣘 ${title} 𖣘
🌻 Prefix: ${PREFIX}
🌻︎ Owner: H4KI XER
🌻︎ Mode: Public
🌻︎ Cmds: ${command.all().length}
╰───────\n`;

        let commands = command.all();
        let categories = [...new Set(commands.map((cmd) => cmd.type || "Misc"))].sort();

        categories.forEach((category) => {
          menu += `\n╭── ${category.toUpperCase()} ──`;
          commands
            .filter((cmd) => cmd.type === category)
            .forEach((cmd) => {
              menu += `\n│❀ ${cmd.pattern}`;
            });
          menu += `\n╰───────\n\n`;
        });

        menu += `\n\n𝗡𝗶𝗸𝗸𝗮 𝘅 𝗠𝗗`;

        const menuImages = [
          "https://cdn.ironman.my.id/i/hvlui0.jpg",
          "https://cdn.ironman.my.id/i/hvlui0.jpg",
          "https://cdn.ironman.my.id/i/hvlui0.jpg",
        ];
        const randomImage = menuImages[Math.floor(Math.random() * menuImages.length)];
        return await message.sendPhoto(randomImage, { caption: await tiny(menu) });
      }
    } catch (e) {
      message.reply(e.message);
    }
  }
);

  

  