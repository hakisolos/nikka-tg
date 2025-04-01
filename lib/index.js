const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");
const { command, execute } = require("./plugins");
const config = require("../config");

async function getJson(url, options) {
  try {
    options = options || {};
    const res = await axios({
      method: "GET",
      url: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
      ...options,
    });
    return res.data;
  } catch (err) {
    console.error("Error during GET request:", err);
    return err;
  }
}
async function trt(txt) {
    try{
        const apiUrl = `${config.API_URL}/tools/translate?text=${txt}`
        const response = await axios.get(apiUrl);
        const res = response.data.data
        return res
    }catch(e){
        return e
        console.log(e)
    }
}
async function upload(filePath) {
  try {
    const bodyForm = new FormData();
    bodyForm.append("fileToUpload", fs.createReadStream(filePath));
    bodyForm.append("reqtype", "fileupload");

    const res = await axios.post("https://catbox.moe/user/api.php", bodyForm, {
      headers: bodyForm.getHeaders(),
    });

    return res.data;
  } catch (error) {
    console.error("Error during media upload:", error);
    throw new Error("Failed to upload media.");
  }
}

module.exports = {
  command,
  execute,
  getJson,
  trt,
  upload,
};
