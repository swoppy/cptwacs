# CPTWACS

A **Cryptocurrency Project's Twitter Account's Screenshots** &nbsp;

It scrapes data from [coingecko](https://coingecko.com) then feeds it to [puppeteer](https://github.com/puppeteer/puppeteer) for screenshots

to run locally, `yarn install` then `yarn start`

## Usage

```js
const getLinks = require("./src/scrape");
const Screenshot = require("./src/screenshot");
const screenshot = new Screenshot();

(async () => {
  const twitterLinks = await getLinks("https://www.coingecko.com/en?page=1");
  screenshot.take(twitterLinks, 1);
})();
```
