var express = require('express');

GLOBAL.app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

GLOBAL.config = require('./config.json');
GLOBAL.robocop = require('./src/robocop');

console.log('My friends call me Murphy. You call me ...');
console.log('Robocop.');

require('require-all')(__dirname + '/src/helpers');

console.log();
console.log('Caching tasks');
robocop.helpers.cacheTasks(function () {
    require('require-all')(__dirname + '/cached_tasks');
    require('./src/home');
    require('./src/hook');
    startServer();
});

function startServer() {
    var server = app.listen(config.port, function () {
        console.log('My duty begins. Somewhere there is a crime happening.');
    });
}

