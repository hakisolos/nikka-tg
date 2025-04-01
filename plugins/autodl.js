const { command, getJson } = require("../lib");
const config = require("../config")
command(
    {
        on: "text",
        dontAddCommandList: true,
    },
    async (message) => {
        const text = message.text || "";
        const tiktokRegex = /(https?:\/\/(?:www\.)?(tiktok\.com\/|vm\.tiktok\.com\/)[^\s]+)/;
        const matchResult = text.match(tiktokRegex);
        if (!matchResult) return;

        const tiktokLink = matchResult[0];
        await message.reply("TikTok link detected! Processing download...");

        try {
            const apiUrl = `${config.API_URL}/dl/tiktok?apiKey=nikka&url=${encodeURIComponent(tiktokLink)}`;
            const response = await getJson(apiUrl);

            if (!response || !response.data) {
                throw new Error("Failed to retrieve video data from the API.");
            }

            const videoUrl = response.data;
            await message.sendVideo(videoUrl)
        } catch (error) {
            await message.reply(`Failed to download video. Error: ${error.message}`);
        }
    }
);
