/**
 * Module dependencies.
 */
var util = require('util');
var argv = require('optimist').argv;
var http = require('http');
var colors = require('colors');
var open = require('open');
var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path');

var app = express();


var sandbox = argv.sandbox;
var frameThisUrl = argv.url;
if (!frameThisUrl) {
  console.log("Missing a valid url. e.g. node dfmb --url=http://www.example.com --sandbox=true")
  process.exit(1);
}

app.configure(function() {
  app.set('port', process.env.PORT || 1338);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
 // app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res) {
  res.render('framed', {
    url: frameThisUrl
  });
})

app.get('/sandbox', function(req, res) {
  res.render('framed_sandbox', {
    url: frameThisUrl
  });
})

http.createServer(app).listen(app.get('port'), function() {
  console.log("\nDon't Frame Me Bro is starting up, trying to frame " + frameThisUrl);
  console.log("Opening http://localhost:" + app.get('port') + "");
});

if (sandbox === 'yes' || sandbox === 'true') {
  console.log('Loading sandboxed iframe...')
  open('http://localhost:' + app.get('port')+'/sandbox');
} else {
  console.log('Loading standards iframe');
  open('http://localhost:' + app.get('port'));
}


setTimeout(function() {
  process.exit(1);
}, 10000)