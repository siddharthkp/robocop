app.post('/hook', function (req, res) {
    var payload = req.body;
    payload.event_type = req.headers['x-github-event'];
    var task;
    var tasksMatched = [];
    for (var i = 0; i < robocop.tasks.length; i++) {
        task = robocop.tasks[i];
        if (task.condition(payload)) {
            var action = task.method(payload);
            if (action) tasksMatched.push(task.name);
        }
    }
    res.end(tasksMatched.length + ' task' + (tasksMatched > 1 ? 's' : '') + ' matched. ' + tasksMatched.join(', '));
});

