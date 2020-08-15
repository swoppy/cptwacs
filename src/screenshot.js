const puppeteer = require("puppeteer");

const createPuppeteer = async (links, fileName) => {
  const path = "src/img/";
  const selector = '[data-testid="primaryColumn"]';

  for (let link = 0; link < links.length; link++) {
    let name = links[link].split(".com/")[1];
    let filePath = path.concat(`${link + fileName}_${name}.png`);

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 600, height: 700, deviceScaleFactor: 2 });

    await page.goto(links[link], {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ]);

    console.log(`We're at ${links[link]}...`);

    await page.waitForSelector(selector);
    const element = await page.$(selector);
    const bounding_box = await element.boundingBox();

    console.log(`Taking a screenshot...`);
    await element.screenshot({
      path: filePath,
      clip: {
        x: bounding_box.x,
        y: bounding_box.y,
        width: Math.min(bounding_box.width, page.viewport().width),
        height: Math.min(bounding_box.height, page.viewport().height),
      },
    });

    console.log(`Screenshot taken! - ${filePath}`);
    await browser.close();
  }
};

class Screenshot {
  take(links, fileName = 1) {
    try {
      createPuppeteer(links, fileName);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Screenshot;
