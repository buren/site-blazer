var env = require('node-env-file');

// Load all environment variables from .env file
env(__dirname + '/.env');

var PageSpeed = require('./lib/page-speed');
var PsiToCSV = require('./lib/psi-to-csv');
var OutputWriter = require('./lib/output-writer');

var args = process.argv.slice(2);
var pageURL = args[0];

PageSpeed.run(pageURL, {strategy: 'mobile'}).then(function (data) {
  PsiToCSV.run(data).then(function(csv) {
    OutputWriter.write('output/result.csv', csv);
  });
}).catch(function(err) {
  console.log('Error: ', err);
});
