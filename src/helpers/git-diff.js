var getDiff = function(pullRequest, callback) {
    var request = require('request');
    var options = {
        url: pullRequest.url + '?access_token=' + config.github_token,
        headers: {
            'User-Agent': 'robocop',
            'Accept': 'application/vnd.github.diff'
        }
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }
    });
}

robocop.helpers.diff = getDiff;

