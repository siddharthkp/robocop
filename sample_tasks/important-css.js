var method = function(payload) {
    var pullRequest = payload.pull_request;
    robocop.helpers.diff(pullRequest, function(files) {
        var filename, extension, changes;
        for (var i = 0; i < files.length; i++) {
            filename = files[i].name;
            extension = filename.substr(filename.lastIndexOf('.'));
            if (extension === '.css') {
                // TODO: Crappy code to check diff. Move this to helper
                changes = files[i].changes;
                for (var j = 0; j < changes.length; j++) {
                    if (changes[j][0] === '+') {
                        if (changes[j].indexOf('!important') !== -1) {
                            robocop.helpers.comment('review', {
                                pullRequest: pullRequest,
                                body: 'Not on my watch!. Check out [the docs](https://github.com/practo/practo/blob/master/docs/css-styleguide.md#specificity).',
                                commit_id: payload.pull_request.head.sha,
                                path: filename,
                                position: j
                            });
                        }
                    }
                }
            }
        }
    });
};

var condition = function(payload) {
    if (payload.event_type === 'pull_request' && ['opened', 'reopened'].indexOf(payload.action) !== -1) {
        return true;
    }
};

robocop.helpers.register('Commit to master', condition, method);

