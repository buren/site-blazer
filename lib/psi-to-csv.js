var objectAssign = require('object-assign');
var json2csv = require('json2csv');

var Promise = require('pinkie-promise');

var exports = {};

var humanizeTitleMap = {
  totalRequestBytes: 'Total size of request bytes sent',
  htmlResponseBytes: 'HTML size',
  cssResponseBytes: 'CSS size',
  imageResponseBytes: 'Image size',
  javascriptResponseBytes: 'JavaScript size',
  otherResponseBytes: 'Other size'
};

function formatByteSize(bytesString) {
  var bytes = Number(bytesString);
  var kBytes = (bytes / 1024).toFixed(1);

  return kBytes + 'kB';
}

function sum(stringNumberArray) {
  return stringNumberArray.reduce(function(previous, current) {
    return Number(previous) + Number(current);
  });
}

function pluckPageStats(data) {
  var stats = data.pageStats;

  var totalSize = [
    stats.totalRequestBytes,
    stats.htmlResponseBytes,
    stats.cssResponseBytes,
    stats.imageResponseBytes,
    stats.javascriptResponseBytes,
    stats.otherResponseBytes
  ];

  return {
    totalSize: formatByteSize(sum(totalSize)),
    totalRequestSize: formatByteSize(stats.totalRequestBytes),
    htmlResponseSize: formatByteSize(stats.htmlResponseBytes),
    cssResponseSize: formatByteSize(stats.cssResponseBytes),
    imageResponseSize: formatByteSize(stats.imageResponseBytes),
    javascriptResponseSize: formatByteSize(stats.javascriptResponseBytes),
    otherResponseSize: formatByteSize(stats.otherResponseBytes)
  };
}

function pluckUsability(data) {
  var usability = data.ruleGroups.USABILITY;
  var score = 'Not applicable';

  // Usability result only available if strategy is "mobile"
  if (data.ruleGroups.USABILITY !== undefined) {
    score = usability.score;
  }

  return score;
}

exports.run = function(data) {
  return new Promise(function(resolve) {
    var stats = pluckPageStats(data);
    var score = {
      usabilityScore: pluckUsability(data),
      speedScore: data.ruleGroups.SPEED.score,
      responseCode: data.responseCode,
      title: data.title,
      url: data.id
    };

    var csvData = objectAssign(score, stats);

    var fields = [
      'responseCode',
      'title',
      'totalSize',
      'speedScore',
      'url',
      'usabilityScore',
      'totalRequestSize',
      'htmlResponseSize',
      'cssResponseSize',
      'imageResponseSize',
      'javascriptResponseSize',
      'otherResponseSize'
    ];

    json2csv({ data: csvData, fields: fields }, function(err, csv) {
      if (err) {
        var error = new Error(err);
        throw error;
      }

      resolve(csv);
    });
  });
};

module.exports = exports;
