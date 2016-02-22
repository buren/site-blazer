var fs = require('fs');

var exports = {};

exports.write = function(fullPath, content) {
  fs.writeFile(fullPath, content, function(err) {
    if(err) {
      var error = new Error(err);
      throw error;
    }
    console.log("The file was saved!");
  });
};

module.exports = exports;
