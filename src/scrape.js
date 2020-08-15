const $ = require("cheerio");
const fetch = require("node-fetch");

const excludeList = [
  "https://www.coingecko.com/en/coins/all",
  "https://www.coingecko.com/en/coins/recently_added",
  "https://www.coingecko.com/en/coins/high_volume",
  "https://www.coingecko.com/en/coins/trending",
  "https://www.coingecko.com/en/coins/compare",
  "https://www.coingecko.com/en/coins/favorites",
];

const excludeTwitterAccounts = [
  "https://twitter.com/coingecko",
  "https://twitter.com/EarnBetCasino/status/1188831382275002368",
  "https://twitter.com/PascalCoin/status/1180526690096816128",
];

class Scrape {
  async getProjectPreSocialLinks(page) {
    let links = [];
    try {
      const response = await fetch(page);
      const html = await response.text();

      console.log(
        `Navigating ${page}, getting pages where twitter links are...`
      );

      const elements = $('a[href^="/en/coins/"]', html).length;

      for (let item = 0; item < elements; item++) {
        let stringLinks = $('a[href^="/en/coins/"]', html)[item].attribs.href;
        links.push(`https://www.coingecko.com${stringLinks}`);
      }

      const list = links.filter((item) => !excludeList.includes(item));
      return [...new Set(list)];
    } catch (e) {
      console.log(e);
    }
  }

  async getTwitterLinks(arrlinks) {
    let links = [];
    for (let p = 0; p < arrlinks.length; p++) {
      const response = await fetch(arrlinks[p]);
      const html = await response.text();

      console.log(`Navigating ${arrlinks[p]}, getting twitter link...`);

      const elements = $('a[href^="https://twitter.com/"]', html).attr(
        "class",
        "coin-link-tag"
      );
      for (let i = 0; i < elements.length; i++) {
        links.push(
          $('a[href^="https://twitter.com/"]', html).attr(
            "class",
            "coin-link-tag"
          )[i].attribs.href
        );
      }

      console.log(`done with ${arrlinks[p]}`);
    }
    return links.filter((item) => !excludeTwitterAccounts.includes(item));
  }
}

const getLinks = async (page) => {
  const scrape = new Scrape();

  // get page links to where the twitter links are
  const pages = await scrape.getProjectPreSocialLinks(page);
  console.log(pages);

  // get actual twitter links
  const twitterLinks = await scrape.getTwitterLinks(pages);
  console.log(twitterLinks);
  return twitterLinks;
};

module.exports = getLinks;
