var path = require('path');
var taskFolder = path.dirname(require.main.filename) + '/' + config.tasks;
require("fs").readdirSync(taskFolder).forEach(function(file) {
    require(taskFolder + '/' + file);
});

