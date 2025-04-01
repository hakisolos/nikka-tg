const axios = require("axios");
const { unsplash, fetchPinterestImages, fetchPixabay, wiki } = require("../lib/func/search");
const {command} = require("../lib/plugins");
command(
    {
        pattern: "gimage",
        desc: "Fetch images based on search query and optional index.",
        
        type: "search",
    },
    async (message, match) => {
        

        try {
            const parts = match.split(',');
            const searchQuery = parts[0].trim();
            const index = parts.length > 1 ? parseInt(parts[1].trim()) : null;

            const response = await axios.get('https://nikka-api.vercel.app/search/googleimg?apiKey=nikka&q=' + encodeURIComponent(searchQuery));
            const images = response.data.images;

            if (Array.isArray(images) && images.length > 0) {
                if (!index) {
                    // Send only 5 images if no index is provided
                    let responseMessage = `Here are 5 images for **${searchQuery}**:\n`;
                    for (let i = 0; i < Math.min(5, images.length); i++) {
                        responseMessage += `**${i + 1}.** Image ${i + 1} 🖼️\n`;
                        await message.sendPhoto(images[i]);
                    }
                } else {
                    if (isNaN(index) || index < 1 || index > images.length) {
                        await message.reply(`🚫 Invalid index. Please provide a valid number between **1** and **${images.length}**.`);
                    } else {
                        const imageUrl = images[index - 1];
                        await message.sendPhoto(imageUrl);
                    }
                }

                
                
            } else {
                await message.reply("No images found for your search.");
                
            }
        } catch (error) {
            await message.reply("An error occurred while fetching the images. Please try again.");
            
        }
    }
);
command(
    {
        pattern: "news",
        desc: "Fetch news based on index, or all news if no index is provided.",
        type: "search",
    },
    async (message, match) => {
        

        try {
            const response = await axios.get('https://nikka-api.vercel.app/search/news?apiKey=nikka');
            const news = response.data.results;

            if (Array.isArray(news) && news.length > 0) {
                let responseMessage = "";

                if (!match) {
                    responseMessage = "Here are the latest news titles:\n";
                    news.forEach((item, index) => {
                        responseMessage += `\n**${index + 1}.** ${item.title} 📢`;
                    });
                } else {
                    const index = parseInt(match.trim());

                    if (isNaN(index) || index < 1 || index > news.length) {
                        responseMessage = `🚫 Invalid index. Please provide a valid number between **1** and **${news.length}**.`;
                    } else {
                        const newsTitle = news[index - 1].title;
                        responseMessage = `**News ${index}:** ${newsTitle} 📢`;
                    }
                }

                await message.reply(responseMessage);
                
                
            } else {
                await message.reply("No news data available.");
                
            }
        } catch (error) {
            await message.reply("An error occurred while fetching the news. Please try again.");
            
        }
    }
);
/*
command(
    {
        pattern: "def",
        desc: "define stuff",
        type: "search",
        
    },
    async(message, match) => {
        const q = match || message.reply_message.text
        if(!q){
            return m.send(`hey ${message.pushName}, i need a query`)

        }
        try{
            const response = await axios.get(`https://api.giftedtech.my.id/api/tools/define?apikey=gifted&term=${q}`)
            resp = response.data
            const res = resp.results[0]
            const text = `
Word: ${res.word}

Definition: ${res.definition}

Author: ${res.author}

Written_on: ${res.written_on}

Example: ${res.example}

Thumbs_down: ${res.thumbs_down}
            `
            const tes = await tiny(text)
            
            await message.send(tes)
        }catch(e){
            await message.send(e)
        }

    }
)
*/
command(
    {
        pattern: "unsplash",
        desc: "Fetch and send the first 5 images from Unsplash",
        
        type: "ai",
    },
    async (message, match) => {
      const name = message.userName
      const prefix = message.prefix
      
        if (!match) {
          
            return await message.reply(`Sorry ${name} Please provide a search term. Example: ${prefix}getimages car`);
            
        }
        

        const images = await unsplash(match);

        if (images.length > 0) {
            for (const url of images) {
                await message.sendPhoto(url);
            }
            
        } else {
            await message.reply("No images found for your search.");
            
        }
    }
);



command(
    {
        pattern: "pinterest",
        desc: "Fetch and send the first 5 Pinterest images",
        
        type: "ai",
    },
    async (message, match) => {
        const name = message.userName;
        const prefix = message.prefix;
        

        if (!match) {
            
            return await message.reply(`Sorry ${name}, please provide a search term. Example: ${prefix}pinterest arabic quotes`);
        }

        const images = await fetchPinterestImages(match);

        if (images === null) {
            await message.reply("An error occurred while fetching images. Please try again.");
            
            return;
        }

        if (images.length > 0) {
            for (const item of images) {
                await message.sendPhoto(item.images_url);
            }
            
        } else {
            await message.reply("No images found for your search.");
            
        }
    }
);




command(
    {
        pattern: "pixabay",
        desc: "Fetch and send the first 5 images from Pixabay",
        
        type: "ai",
    },
    async (message, match) => {
        const name = message.userName;
        const prefix = message.prefix;
        
        

        if (!match) {
            
            return await message.reply(`Sorry ${name}, please provide a search term. Example: ${prefix}pixabay car`);
        }

        const images = await fetchPixabay(match);

        if (images.length > 0) {
            for (const url of images) {
                await message.sendPhotol(url);
            }
        } else {
            await message.reply("No images found for your search.");
            
        }
    }
);



command(
    {
        pattern: "wiki",
        desc: "Get Wikipedia data",
        
        type: "search",
    },
    async (message, match) => {
        if (!match) {
            
            return await message.reply("Please provide a search query.");
        }
        

        const result = await wiki(match);
        
        if (!result) {
            return await message.reply("No results found.");
        }

        const { text, image } = result;

        // Send image with caption
        
        await message.sendPhoto(image, {caption: text});
        
    }
);

        // Limit results if a valid limit is provided
    /*      
  command(
    {
      pattern: "yts",
      
      desc: "Search YouTube and fetch video details",
      type: "search",
    },
    async (message, match) => {
      try {
        if (!match) {
          
          return await message.reply("Please provide a search term.");
        }
  
        
  
        // Parse query and optional limit
        const [query, limit] = match.split(",").map((item) => item.trim());
        const maxResults = limit && !isNaN(limit) ? parseInt(limit) : null;
  
        const response = await getJson(`https://nikka-api.vercel.app/search/yts?apiKey=nikka&q=${query}`);
  
        if (!response || !response.data || response.data.length === 0) {
          
          return await messge.reply("No results found for your query.");
        }
  
        // Limit results if a valid limit is provided
 const ytSearch = require("yt-search");

command(
  {
    pattern: "yts",
    desc: "Search YouTube and fetch video details",
    type: "search",
  },
  async (message, match) => {
    try {
      if (!match) {
        return await message.reply("Please provide a search term.");
      }

      // Parse query and optional limit
      const [query, limit] = match.split(",").map((item) => item.trim());
      const maxResults = limit && !isNaN(limit) ? parseInt(limit) : 5; // Default to 5 results

      const response = await ytSearch(query);

      if (!response.videos.length) {
        return await message.reply("No results found for your query.");
      }

      // Limit results
      const results = response.videos.slice(0, maxResults).map((res, index) => {
        return `
📌 **Result ${index + 1}:**
> **Title:** ${res.title}
> **Duration:** ${res.timestamp}
> **Views:** ${res.views}
> **Uploaded:** ${res.ago}
> **URL:** ${res.url}
        `;
      }).join("\n\n");

      await message.send(results);
      
    } catch (error) {
      console.error("Error in yts command:", error);
      await message.reply("An error occurred while fetching YouTube search results.");
    }
  }
);      
        
  */