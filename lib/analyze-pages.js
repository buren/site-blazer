var PageSpeed = require('./page-speed');
var PsiToCSV = require('./psi-to-csv');

var exports = {};

exports.run = function(pageURLs) {
  return new Promise(function(resolve) {
    var analyzedPages = pageURLs.map(function(pageURL) {
      return PageSpeed.run(pageURL);
    });

    Promise.all(analyzedPages).then(function(dataArray) {
      PsiToCSV.run(dataArray).then(function(csv) {
        resolve(csv);
      });
    }).catch(function(err) {
      var error = new Error(err);
      throw error;
    });
  });
}

module.exports = exports;
