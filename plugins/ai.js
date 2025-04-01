const { gemini, maths, you, groq, meta,  flux, blackbox, llama, dalle, gpt, hakiu, nikka, claude, jeevs, shaka } = require("../lib/func/ai");

const {command} = require("../lib/plugins")

command(
    {   
        pattern: "meta-ai",
        desc: "Gets response from meta AI",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, how can I help you?`);
        }
        try {
            
            
            const res = await meta(query);
            await message.send(res)
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);

command(
    {
        pattern: "gemini",
        desc: "Gets response from Gemini AI",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, how can I help you?`);
        }
        try {
            
            
            const res = await gemini(query);
            await message.send(res)
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);
command(
    {
        pattern: "groq",
        desc: "Gets response from Groq AI",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, how can I help you?`);
        }
        try {
            
            
            const res = await groq(query);
            await message.send(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);
command(
    {
        pattern: "llama",
        desc: "Gets response from lama AI",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, how can I help you?`);
        }
        try {
            
            
            const res = await llama(query);
            await message.send(res)
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);

command(
    {
        pattern: "dalle",
        desc: "Generates an image using DALL·E AI",
        
        type: "ai",
    },
    async (message, match) => {
        const prompt = match.trim();
        if (!prompt) {
            
            return await message.reply(`Hello ${message.userName}, please provide a prompt for the image.`);
        }
        try {
            
            const res = await dalle(prompt)
            await message.sendPhoto(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while generating the image. Please try again later.");
            console.error(error);
        }
    }
);
command(
    {
        pattern: "gpt",
        desc: "Gets response from GPT-4o",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, how can I help you?`);
        }
        try {
            
            
            const userId = m.sender.split('@')[0]; 
            const res = await gpt(query, userId)
            await message.send(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);
command(
    {
        pattern: "claude",
        desc: "Gets response from claude ai",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, how can I help you?`);
        }
        try {
            
            
            const userId = m.sender.split('@')[0]; 
            const res = await claude(query, userId)
            await message.send(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);
command(
    {
        pattern: "hakiu",
        desc: "Gets response from claude hakiu ai",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, how can I help you?`);
        }
        try {
            
            
            const userId = m.sender.split('@')[0]; 
            const res = await hakiu(query, userId)
            await message.send(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);
command(
    {
        pattern: "shaka",
        desc: "Gets response from shaka AI",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, im shaka, how can I help you?`);
        }
        try {
            
            
            const res = await shaka(query);
            await message.send(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);

command(
    {
        pattern: "nikka",
        desc: "Gets response from nikka AI",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, im nikka, how can I help you?`);
        }
        try {
            
            
            const res = await nikka(query);
            await message.send(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);

command(
    {
        pattern: "jeevs",
        desc: "Gets response from jeevs AI",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, how can I help you?`);
        }
        try {
            
            
            const res = await jeevs(query);
            await message.send(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);

command(
    {
        pattern: "maths",
        desc: "Gets response from math AI",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, what maths would you like me to solve?`);
        }
        try {
            
            
            const res = await maths(query);
            await message.send(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);

command(
    {
        pattern: "flux",
        desc: "Generates an image using flux AI",
        
        type: "ai",
    },
    async (message, match) => {
        const prompt = match.trim();
        if (!prompt) {
            
            return await message.reply(`Hello ${message.userName}, please provide a prompt for the image.`);
        }
        try {
            
            const res = await flux(prompt)
            await message.sendPhoto(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while generating the image. Please try again later.");
            console.error(error);
        }
    }
);


command(
    {
        pattern: "blackbox",
        desc: "Gets response from blackbox AI",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, how can i help?`);
        }
        try {
            
            
            const res = await blackbox(query);
            await message.send(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);

command(
    {
        pattern: "you-ai",
        desc: "Gets response from blackbox AI",
        
        type: "ai",
    },
    async (message, match, m) => {
        const query = match.trim();
        if (!query) {
            
            return await message.reply(`Hello ${message.userName}, how can i help?`);
        }
        try {
            
            
            const res = await you(query);
            await message.send(res);
            
        } catch (error) {
            
            await message.reply("An error occurred while processing your request. Please try again later.");
            console.error(error);
        }
    }
);