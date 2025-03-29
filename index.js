const config = require("./config");
const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");
const { processMessage } = require("./lib/serialize");
const { execute } = require("./lib/plugins");

const BOT_TOKEN = config.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN is missing!");
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

console.log("Installing plugins...");

try {
  fs.readdirSync(path.join(__dirname, "plugins"))
    .filter(file => file.endsWith(".js"))
    .forEach(file => {
      try {
        require(`./plugins/${file}`);
        console.log(`✅ Plugin loaded: ${file}`);
      } catch (err) {
        console.error(`⚠️ Failed to load plugin ${file}:`, err.message);
      }
    });
} catch (err) {
  console.error("❌ Error loading plugins:", err.message);
  process.exit(1);
}

let lastUpdateId = 0;

bot.on("text", async (ctx) => {
  try {
    if (ctx.update.update_id <= lastUpdateId) return;
    lastUpdateId = ctx.update.update_id;

    const message = processMessage(ctx);
    await execute(message);
  } catch (err) {
    console.error("❌ Error processing message:", err.message);
  }
});

bot.catch((err) => {
  console.error("❌ Telegram bot error:", err.message);
});

console.log("Launching bot...");
try{
bot.launch()
   console.log("🤖 nikka md  running...")
}catch(error){
    console.log(error)
}
process.once("SIGINT", () => {
  console.log("🛑 Stopping bot (SIGINT)...");
  bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
  console.log("🛑 Stopping bot (SIGTERM)...");
  bot.stop("SIGTERM");
});
