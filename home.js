const puppeteer = require('puppeteer');



(async event => {

  const key_words = 'costco';
  const link = 'https://www.google.com';

  const browser = await puppeteer.launch({ headless: true, slowMo: 100, devtools: true });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1199, height: 900 });

    await page.goto(link);

    await page.waitForSelector('div form div:nth-child(2) input');
    await page.click('div form div:nth-child(2) input');
    await page.keyboard.type(key_words);
    await page.keyboard.press('Enter');

    await page.waitFor(6000);


    await page.setViewport({ width: 1199, height: 900 });

    await page.waitForSelector('div form div:nth-child(2) input');
    await page.click('div form div:nth-child(2) input');
    await page.keyboard.type('milk');
    await page.keyboard.press('Enter');

   //await page.waitFor(5000);



    await page.waitForSelector(
      '#main > div #center_col #search > div > div > div'
    );
    const url = await getHref(
      page,
      `#main > div #center_col #search > div > div > div a`
    );

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    await page.screenshot({
      fullPage: true,
      path: 'new_image.png'
    });
    const screenshotPath = process.cwd() + '/new_image.png';

    console.log('URL of the page:', url);
    console.log('Location of the screenshot:', screenshotPath);

    await page.close();
    await browser.close();
  } catch (error) {
    console.log(error);
    await browser.close();
  }
})();

const getHref = (page, selector) =>
  page.evaluate(
    selector => document.querySelector(selector).getAttribute('href'),
    selector
  );


  var innerDiv = document.createElement('div');
    innerDiv.className = `block`;
    innerDiv.id = `block`;
    document.body.appendChild(innerDiv);

    var tagName = document.createElement("h1");
    var textName = document.createTextNode(url);
    tagName.appendChild(textName); 
    var elementName = document.getElementById(`block`);
    elementName.appendChild(tagName);