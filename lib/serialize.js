module.exports.processMessage = (ctx) => {
  return {
    sender: ctx.from.id,
    jid: ctx.chat.id,
    text: ctx.message?.text || "",
    message: ctx.message || "",
    userName: `${ctx.message.from.first_name}_${ctx.message.from.last_name}`.trim() || "",
    reply_message: ctx.reply_to_message || "",

    send: (text) => ctx.telegram.sendMessage(ctx.chat.id, text),
    reply: (text) => ctx.reply(text),
    sendPhoto: (url, options = {}) => ctx.telegram.sendPhoto(ctx.chat.id, url, options),
    sendVideo: (url, options = {}) => ctx.telegram.sendVideo(ctx.chat.id, url, options),
    audio: (url, options = {}) => ctx.replyWithAudio(url, options),
    sendAudio: (url, options = {}) => ctx.telegram.sendAudio(ctx.chat.id, url, options),
    sendDocument: (url, options = {}) => ctx.telegram.sendDocument(ctx.chat.id, url, options),
    sendSticker: (url) => ctx.telegram.sendSticker(ctx.chat.id, url),
    sendPoll: (question, options = []) => ctx.telegram.sendPoll(ctx.chat.id, question, options),

    sendButtons: (text, buttons) => {
      ctx.telegram.sendMessage(ctx.chat.id, text, {
        reply_markup: { inline_keyboard: buttons },
      });
    },

    sendContact: (phoneNumber, firstName, lastName = "") =>
      ctx.telegram.sendContact(ctx.chat.id, phoneNumber, firstName, lastName),

    sendKeyboard: (text, keyboard, removeAfter = false) => {
      ctx.telegram.sendMessage(ctx.chat.id, text, {
        reply_markup: {
          keyboard,
          one_time_keyboard: removeAfter,
          resize_keyboard: true,
        },
      });
    },

    forwardMessage: (fromChatId, messageId) =>
      ctx.telegram.forwardMessage(ctx.chat.id, fromChatId, messageId),

    edit: (messageId, newText) =>
      ctx.telegram.editMessageText(ctx.chat.id, messageId, null, newText),

    react: async (emoji) => {
      try {
        await ctx.telegram.callApi("setMessageReaction", {
          chat_id: ctx.chat.id,
          message_id: ctx.message.message_id,
          reaction: [{ type: "emoji", emoji }],
        });
      } catch (error) {
        console.error("Reaction Error:", error);
      }
    },
  };
};
