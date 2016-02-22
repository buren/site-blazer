require('./lib/read-env');

var OutputWriter = require('./lib/output-writer');
var AnalyzePages = require('./lib/analyze-pages');

var args = process.argv.slice(2);

AnalyzePages.run(args).then(function(csv) {
  OutputWriter.write('output/result.csv', csv);
});
