app.post('/hook', function (req, res) {
    var task;
    var tasksMatched = [];
    for (var i = 0; i < robocop.tasks.length; i++) {
        task = robocop.tasks[i];
        if (task.condition) {
            var action = task.method(req.body);
            if (action) tasksMatched.push(task.name);
        }
    }
    res.end(tasksMatched.length + ' task' + (tasksMatched > 1 ? 's' : '') + ' matched: ' + tasksMatched.join(', '));
});

