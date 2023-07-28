const cron = require('node-cron');
const { scrapeKsl, buildSearchUrl } = require('./kslScraper');
const { wipeDatabase } = require('./utils/databaseUtils');

// Schedule the KSL scraping every Sunday at midnight.
cron.schedule('0 0 * * 0', function() {
  const searchUrl = buildSearchUrl('84101', '25', 'Toyota', 'Camry', '2010', '5000');
  scrapeKsl(searchUrl);
});

// Schedule the database wipe on the first day of every month at midnight.
cron.schedule('0 0 1 * *', function() {
  //wipeDatabase is a hypothetical function used to wipe the database
  wipeDatabase();
});
