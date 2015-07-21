var express = require('express');
GLOBAL.app = express();
var bodyParser = require('body-parser');
GLOBAL.config = require('./config.json');
var server = app.listen(config.port, function () {
      console.log('My friends call me Murphy. You call me... Robocop.');
});
app.use(bodyParser.json());

GLOBAL.robocop = require('./src/robocop');
require('./src/tasks-loader');
require('./src/hook');

