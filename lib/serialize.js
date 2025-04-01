const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { upload } = require('./index');  // Assuming the upload function is correctly imported

module.exports.processMessage = (ctx) => {
  return {
    ctx: ctx,
    sender: ctx.from.id,
    chat: ctx.chat,
    jid: ctx.chat.id,
    text: ctx.message?.text || "",
    message: ctx.message || "",
    userName: `${ctx.message.from.first_name}_${ctx.message.from.last_name}`.trim() || "",
    reply_message: ctx.reply_to_message || "",

    send: (text) => ctx.telegram.sendMessage(ctx.chat.id, text),
    reply: (text) => ctx.reply(text),
    getAdmins: () => ctx.getChatAdministrators(),
    sendPhoto: (url, options = {}) => ctx.telegram.sendPhoto(ctx.chat.id, url, options),
    sendVideo: (url, options = {}) => ctx.telegram.sendVideo(ctx.chat.id, url, options),
    audio: (url, options = {}) => ctx.replyWithAudio(url, options),
    sendAudio: (url, options = {}) => ctx.telegram.sendAudio(ctx.chat.id, url, options),
    sendDocument: (url, options = {}) => ctx.telegram.sendDocument(ctx.chat.id, url, options),
    sendSticker: (url) => ctx.telegram.sendSticker(ctx.chat.id, url),
    sendPoll: (question, options = []) => ctx.telegram.sendPoll(ctx.chat.id, question, options),
    
    // Inline keyboard
    sendButtons: (text, buttons) => {
      ctx.telegram.sendMessage(ctx.chat.id, text, {
        reply_markup: { inline_keyboard: buttons },
      });
    },

    // Contact message
    sendContact: (phoneNumber, firstName, lastName = "") =>
      ctx.telegram.sendContact(ctx.chat.id, phoneNumber, firstName, lastName),

    // Reply Keyboard
    sendKeyboard: (text, keyboard, removeAfter = false) => {
      ctx.telegram.sendMessage(ctx.chat.id, text, {
        reply_markup: {
          keyboard,
          one_time_keyboard: removeAfter,
          resize_keyboard: true,
        },
      });
    },

    // Force Reply
    forceReply: (text) => {
      ctx.telegram.sendMessage(ctx.chat.id, text, {
        reply_markup: { force_reply: true },
      });
    },

    // Forward Message
    forwardMessage: (fromChatId, messageId) =>
      ctx.telegram.forwardMessage(ctx.chat.id, fromChatId, messageId),

    // Edit message
    edit: (messageId, newText) =>
      ctx.telegram.editMessageText(ctx.chat.id, messageId, null, newText),

    // React to message
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

    // Send a game
    sendGame: (gameShortName) => {
      ctx.telegram.sendGame(ctx.chat.id, gameShortName);
    },

    // Send a venue (location with title and address)
    sendVenue: (lat, lon, title, address) => {
      ctx.telegram.sendVenue(ctx.chat.id, lat, lon, title, address);
    },
  };
};
