var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config.json');
var server = app.listen(config.port, function () {
      console.log('My friends call me Murphy. You call me... Robocop.');
});
app.use(bodyParser.json());

require('./tasks-loader');

