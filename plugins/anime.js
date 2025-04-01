const axios = require("axios");
const { gojo, goku, animeChar } = require("../lib/func/anime")
const {command} = require("../lib/plugins");
command(
  {
    pattern: "animestatus",
    desc: "downloads anime status videos",
    type: "anime",
    

  },
  async(message) => {
    
    try{
      const api = "https://nikka-api.vercel.app/anime/status?apiKey=nikka";
      const response = await axios.get(api);
      const res = response.data.video;
      const vid = res.link;
      const title = "> POWERED BY NIKKA TECH"

      await message.sendVideo(vid, {caption: title} )
      
    } catch(error){
       
        await message.send(error)
        console.log(error)
    }
  }
)

command(

  {

    pattern: "gojo",

    desc: "downloads gojo amv",

    type: "anime",

    

  },

  async(message) => {

    

    try{

      const vid = await gojo()      

      const title = "> POWERED BY NIKKA TECH"

      await message.sendVideo(vid, {caption: title} )

      

    } catch(error){

       

        console.log(error)

    }

  }

)
command(

  {

    pattern: "goku",

    desc: "downloads goku amv",

    type: "anime",

    

  },

  async(message) => {

    

    try{

      const vid = await goku()

      

      const title = "> POWERED BY NIKKA TECH"

      await message.sendVideo(vid, {caption: title} )

      await message.react("");

    } catch(error){

       

        await message.send(error)

        console.log(error)

    }

  }

)

command(

  {

    pattern: "anime-character",

    desc: "Fetch details of an anime character",

    type: "anime",

 

  },

  async (message, match) => {

    if (!match) {

      return await message.reply("Please provide the name of the anime character.");

    }

    

    try {

      const charDetails = await animeChar(match);

      if (!charDetails) {

        throw new Error("Character details not found");

      }

      const { name, alias, url, thumb, anime, manga } = charDetails;

      const caption = `

Name: ${name}

Alias: ${alias || "N/A"}

URL: ${url}

Anime: ${anime || "N/A"}

Manga: ${manga || "N/A"}

      `;

      // Ensure the send method is correct for your bot

      await message.sendPhoto(thumb, {caption: caption});

      

    } catch (error) {

      

      await message.reply("Sorry, something went wrong. Please try again later.");

      console.error(error);

    }

  }

);