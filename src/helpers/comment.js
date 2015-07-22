var comment = function(commit, message) {
    console.log(message);

    var request = require('request');
        var options = {
            url: commit.url.replace('github.com/', 'api.github.com/repos/').replace('commit', 'commits') + '/comments?access_token=' + config.github_token,
            method: 'POST',
            headers: {
                'User-Agent': 'robocop',
                'Content-Type': 'application/json'
            },
            json: {
                body: message
            }
        };

        request(options, function(error, response, body) {
            console.log(response.statusCode);
        });

}

robocop.helpers.comment = comment;

