var method = function(payload) {
    var pullRequest = payload.pull_request;
    robocop.helpers.diff(pullRequest, function(files) {
        var filename, extension, changes;
        var commit_id = payload.pull_request.head.sha;
        for (var i = 0; i < files.length; i++) {
            filename = files[i].name;
            extension = filename.substr(filename.lastIndexOf('.'));
            if (extension === '.css') {
                // TODO: Crappy code to check diff. Move this to helper
                changes = files[i].changes;
                for (var j = 0; j < changes.length; j++) {
                    if (isAddition(changes[j])) {
                        if (changes[j].indexOf('!important') !== -1) {
                          comment(pullRequest, commit_id, filename, j);
                        }
                    }
                }
            }
        }
    });
};

function isAddition(line) {
    return line[0] === '+';
}

function comment(pullRequest, commit_id, filename, position) {
    robocop.helpers.comment('review', {
        pullRequest: pullRequest,
        body: 'Not on my watch!. Check out [the docs](https://github.com/practo/practo/blob/master/docs/css-styleguide.md#specificity).',
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

robocop.helpers.register('!important', condition, method);

