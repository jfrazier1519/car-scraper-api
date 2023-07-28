const axios = require("axios");
const cheerio = require("cheerio");
const carService = require("../services/car-serv");

// Define the base URL for the KSL search.
const BASE_URL = "https://www.ksl.com/auto/search/index?";

// Define a function to build a search URL given some parameters.
function buildSearchUrl(zip, miles, make, model, year, price) {
  return `${BASE_URL}zip=${zip}&miles=${miles}&make[]=${make}&model[]=${model}&year=${year}&priceTo=${price}&sellerType=Private&sort=0&perPage=96`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrapeKsl(url) {
  console.log(`Scraping URL: ${url}`); // Added logging

  try {
    // Delay between 5 to 10 seconds (adjust as necessary)
    await sleep(Math.random() * 5000 + 5000);

    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537' },
      timeout: 10000
    });

    if(response.status !== 200){
      console.log(`Request to ${url} failed with status: ${response.status}`);
      return;
    }

    const html = response.data;
    const $ = cheerio.load(html);
    const carsList = [];

    $(".listing").each(function () {
      const title = $(this).find(".title").text();
      const price = $(this).find(".price").text();
      const yearMakeModel = $(this).find(".title > span").text().split(" ");
      const year = yearMakeModel[0];
      const make = yearMakeModel[1];
      const model = yearMakeModel[2];
      const details = $(this).find(".details").text();

      carsList.push({ title, price, year, make, model, details });
    });

    if(carsList.length === 0){
      console.log('No cars were found');
    }

    // After retrieving all cars, store them in your database
    for (const car of carsList) {
      console.log(car);
      await carService.createCar(car);
    }
  } catch (error) {
    console.error(`An error occurred while scraping: ${error}`);
  }
}


// Use the function to build a search URL and scrape the page.
const searchUrl = buildSearchUrl(
  "84020",
  "",
  "Toyota",
  "Camry",
  "",
  ""
);
scrapeKsl(searchUrl);
