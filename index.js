var env = require('node-env-file');

// Load all environment variables from .env file
env(__dirname + '/.env');

var PageSpeed = require('./lib/page-speed');
var PsiToCSV = require('./lib/psi-to-csv');
var OutputWriter = require('./lib/output-writer');

var args = process.argv.slice(2);

var analyzedPages = args.map(function(pageURL) {
  return PageSpeed.run(pageURL);
});

Promise.all(analyzedPages).then(function (dataArray) {
  PsiToCSV.run(dataArray).then(function(csv) {
    OutputWriter.write('output/result.csv', csv);
  });
}).catch(function(err) {
  console.log('Error: ', err);
});
