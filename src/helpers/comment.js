var comment = function(type, data) {
    if (config.debug) {
        console.log(type);
        console.log(data);
    }
    else if (type === 'commit') commitComment(data);
    else if (type === 'review') reviewComment(data);
};

robocop.helpers.comment = comment;

var commitComment = function(data) {
    var commit = data.commit;
    var message = data.message;
    var url = commit.url.replace('github.com/', 'api.github.com/repos/').replace('commit', 'commits') + '/comments?access_token=' + config.github_token;
    var data = {
        body: message
    }
    post(url, data);
};

var reviewComment = function(data) {
    var pullRequest = data.pullRequest;
    var url = pullRequest.url + '/comments?access_token=' + config.github_token;
    delete data.pullRequest;
    post(url, data);
};

function post(url, data, callback) {
    var request = require('request');
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'User-Agent': 'robocop',
            'Content-Type': 'application/json'
        },
        json: data
    };

    request(options, function(error, response, body) {
        console.log(response.statusCode, url);
        if (callback) callback(response.statusCode, body);
    });
}
