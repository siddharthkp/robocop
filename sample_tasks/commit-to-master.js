var method = function(payload) {
    if (payload.ref === 'refs/heads/master') {
        if (payload.head_commit.message.indexOf('Merge pull request #') === -1) {
            robocop.helpers.comment(payload.head_commit, 'Commit on master!');
            return true;
        }
    }
    return false;
};

var condition = function(payload) {
    if (payload.event_type === 'push') return true;
};

robocop.helpers.register('Commit to master', condition, method);

