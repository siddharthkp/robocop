function comment(pullRequest, commit_id, filename, position) {
    robocop.helpers.comment('review', {
        pullRequest: pullRequest,
        body: 'Not on my watch! Check out [the docs](https://github.com/practo/practo/blob/master/docs/css-styleguide.md#specificity).',
        commit_id: commit_id,
        path: filename,
        position: position
    });
}

var condition = function(payload) {
    if (payload.event_type === 'pull_request' && ['opened', 'reopened', 'synchronize'].indexOf(payload.action) !== -1) {
        return true;
    }
};

var method = function(payload) {
    var pullRequest = payload.pull_request;
    robocop.helpers.diff(pullRequest, function(files) {
        var commit_id = payload.pull_request.head.sha;
        // sniff - files, filetype, word, function
        robocop.helpers.sniff(files, 'css', '!important', function(filename, j) {
            comment(pullRequest, commit_id, filename, j);
        });
    });
};

robocop.helpers.register('!important', condition, method);

