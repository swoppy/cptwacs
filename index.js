const getLinks = require("./src/scrape");
const Screenshot = require("./src/screenshot");
const supplement = require("./src/supplement").supplementals;

const screenshot = new Screenshot();

(async () => {
  const twitterLinks = await getLinks("https://www.coingecko.com/en?page=1");
  screenshot.take(twitterLinks, 1);
})();

// uncomment supplemental screenshot when needed as puppeteer is not perfect.
// this act as an update when screenshot is not able to take actual content
//screenshot.take(supplement);
