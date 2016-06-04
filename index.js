GLOBAL.config = require('./config.json');
if (config.newrelic_key) require('newrelic');

var express = require('express');
var raven = require('raven');

GLOBAL.app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

GLOBAL.robocop = require('./src/robocop');

app.use(raven.middleware.express(config.sentry_dsn));

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
    app.listen(config.port, function () {
        console.log('My duty begins. Somewhere there is a crime happening.');
    });
}

