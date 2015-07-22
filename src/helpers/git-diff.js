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
            var files = [];
            var filename, changes;
            var bodySplit = body.split('diff --git');
            for (var i = 0; i < bodySplit.length; i++) {
                filename = bodySplit[i].split('\n')[0].split(' b/')[1];
                changes = bodySplit[i].split(' @@')[1];
                if (changes) changes = changes.split('\n');
                else changes = [];

                if (!filename) continue;
                files.push({
                    name: filename,
                    changes: changes
                });
            }
            callback(files);
        }
    });
}

robocop.helpers.diff = getDiff;

