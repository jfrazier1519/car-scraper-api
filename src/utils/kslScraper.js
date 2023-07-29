const puppeteer = require('puppeteer');
const carService = require("../services/car-serv");

(async () => {
  // Use dynamic import for 'p-retry'.
  const pRetry = await import('p-retry');

  const BASE_URL = 'https://cars.ksl.com/search/';

  async function scrapeKsl(searchZipCode, searchRadius) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Click on the 'Select Location' button
    await page.click('.Location__Link-sc-73vzho-0');

    // Wait for the modal to appear and fill in the location and radius
    await page.waitForSelector('.Modal__ModalMain-cfe9l3-0');
    await page.waitForSelector('.Input__HTMLInput-sc-5nc449-2');
    await page.focus('.Input__HTMLInput-sc-5nc449-2');
    await page.type('.Input__HTMLInput-sc-5nc449-2', searchZipCode);

    // Adjust the radius slider
    const radiusValue = (100 - searchRadius) / 100;
    await page.evaluate((value) => {
      let slider = document.querySelector('.SingleSlider__SliderContainer-whdv95-0');
      let event = new Event('input', { bubbles: true });
      slider.value = value;
      slider.dispatchEvent(event);
    }, radiusValue);

    // Submit the form
    await page.keyboard.press('Enter');

    // Wait for the results to load
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    const carsList = await page.evaluate(() => {
      const cars = Array.from(document.querySelectorAll('.listing'));

      return cars.map(car => {
        const titleElement = car.querySelector('.title');
        const priceElement = car.querySelector('.price');
        const detailsElement = car.querySelector('.details');

        const yearMakeModel = titleElement.textContent.split(' ');
        const year = yearMakeModel[0];
        const make = yearMakeModel[1];
        const model = yearMakeModel.slice(2).join(' ');
        const title = `${year} ${make} ${model}`;
        const price = priceElement.textContent;
        const details = detailsElement.textContent;

        return { title, price, year, make, model, details };
      });
    });

    await browser.close();

    // After retrieving all cars, store them in your database
    for (const car of carsList) {
      console.log(car);
      await carService.createCar(car);
    }
  }

  // Use the function to search all cars within a 25-mile radius of the given zip code
  pRetry.default(() => scrapeKsl("84020", 25), {
    retries: 0,
    onFailedAttempt: (error) => {
      console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
    }
  }).catch((err) => {
    console.error('Scraping failed:', err);
  });

})();
