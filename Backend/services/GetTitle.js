const cheerio = require("cheerio");
const axios = require("axios");

//*This function go to the URL and scrape the <title> from the HTML

async function getTitle(url) {
  try {
    const page = await axios.get(url);
    const $ = cheerio.load(page.data);
    const header = $("title").text();
    return header;
  } catch (error) {
    return null;
  }
}

module.exports = getTitle;
