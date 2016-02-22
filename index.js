require('./lib/read-env')

var AnalyzePages = require('./lib/analyze-pages');

var express = require('express');
var app = express();

var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Body parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/analyze', urlencodedParser, function(request, response) {
  if (!request.body) {
    return response.sendStatus(400);
  };

  var analyzeURLs = function(urlListParam) {
    return request.body.urlList.split('\n');
  };

  AnalyzePages.run(analyzeURLs()).then(function(csv) {
    response.set('Content-Disposition', 'attachment;filename=result.csv');
    response.send(new Buffer(csv));
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
