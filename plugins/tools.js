const { command, upload, trt } = require("../lib");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const config = require("../config");


//==========================================================================//
command(
  {
    pattern: "url",
    desc: "uploads media",
    type: "tools",
  },
  async (message) => { 
    const msg = message.ctx.message.reply_to_message;
    if (!msg || (!msg.photo && !msg.video && !msg.document && !msg.voice && !msg.audio)) {
      return message.ctx.reply("❌ Please reply to an image, video, or document.");
    }

    let fileId;
    if (msg.photo) {
      fileId = msg.photo[msg.photo.length - 1].file_id;
    } else if (msg.video) {
      fileId = msg.video.file_id;
    }else if (msg.sticker) {
      fileId = msg.sticker.file_id;
    }else if (msg.voice) {
      fileId = msg.voice.file_id;
    }
    else if (msg.audio) {
      fileId = msg.audio.file_id;
    }
     else if (msg.document) {
      fileId = msg.document.file_id;
    }

    const file = await message.ctx.telegram.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`;
    const filePath = path.join(__dirname, "../temp", path.basename(file.file_path));

    const response = await axios({ url: fileUrl, responseType: "arraybuffer" });
    fs.writeFileSync(filePath, response.data);

    const mediaUrl = await upload(filePath);
    fs.unlinkSync(filePath);

    return message.ctx.reply(`✅ Uploaded successfully: ${mediaUrl}`);
  }
);


command(
    {
        pattern: "trt",
        desc: "Translator",
        type: "tools",
    },
    async (message) => {
        
        if (!message.ctx.reply_to_message || !message.ctx.reply_to_message.text) {
            return message.reply("Please reply to a message with the text you want to translate.");
        }
        const query = message.ctx.reply_to_message.text;
        try {
            const translation = await trt(query);
            return message.reply(translation);
        } catch (e) {
            console.log(e); 
            return message.reply("An error occurred while translating.");
      }
    }
);