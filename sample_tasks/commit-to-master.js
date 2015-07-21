var checkCommitToMaster = function(payload) {
    if (payload.ref === 'refs/heads/master') {
        if (payload.head_commit.message.indexOf('Merge pull request #') === -1) {
            robocop.helpers.comment('hooo my god');
            return true;
        }
    }
    return false;
}

robocop.helpers.register({
    name: 'Commit to master',
    condition: true,
    method: checkCommitToMaster
});

