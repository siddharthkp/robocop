var taskFolder = config.tasks;
require("fs").readdirSync(taskFolder).forEach(function(file) {
    require(taskFolder + '/' + file);
});
