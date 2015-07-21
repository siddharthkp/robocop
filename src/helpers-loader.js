var path = require('path');
var helpers = path.dirname(require.main.filename) + '/src/helpers';
require("fs").readdirSync(helpers).forEach(function(file) {
    require(helpers + '/' + file);
});

