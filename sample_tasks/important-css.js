var method = function(payload) {
    var pullRequest = payload.pull_request;
    robocop.helpers.diff(pullRequest, function(body) {
        console.log(body);
    });
};

var condition = function(payload) {
    if (['pull_request'].indexOf(payload.event_type) !== -1) return true;
};

robocop.helpers.register('Commit to master', condition, method);

