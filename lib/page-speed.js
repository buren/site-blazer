var psi = require('psi');
var objectAssign = require('object-assign');

var exports = {};

var API_KEY = process.env.GOOGLE_PAGE_INSIGHTS_API_KEY;

if (API_KEY === undefined) {
  var error = new Error('GOOGLE_PAGE_INSIGHTS_API_KEY environment variable must be set!');
  throw error;
}

function getOptions(options) {
  if (options === undefined) {
    options = {};
  }

  options = objectAssign({strategy: 'mobile'}, options);
  options = objectAssign({key: API_KEY}, options);
  return options;
}

// Returns a promise
exports.run = function(pageURL, options) {
  return psi(pageURL, getOptions(options));
}

module.exports = exports;
