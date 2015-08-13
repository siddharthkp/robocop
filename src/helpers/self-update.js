var method = function(payload) {
    if (payload.ref !== 'refs/heads/master') return false;
    var pullRequest = payload.pull_request;
    robocop.helpers.diff(pullRequest, function(files) {
        var filename, tasksAdded;
        for (var i = 0; i < files.length; i++) {
            filename = files[i].name;
            if (filename.indexOf(config.directory_name) !== -1) {
                tasksAdded = true;
            }
        }
        if (tasksAdded) {
            robocop.helpers.cacheTasks();
            robocop.helpers.comment('commit', {
                commit: payload.head_commit,
                message: 'Thanks son. I\' take it from here.'
            });
        }
    });
};

var condition = function(payload) {
    if (payload.event_type === 'push') return true;
};

robocop.helpers.register('Self update', condition, method);

