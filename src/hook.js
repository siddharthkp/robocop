app.post('/hook', function (req, res) {
    var payload = req.body;
    payload.event_type = req.headers['x-github-event'];
    var task;
    for (var i = 0; i < robocop.tasks.length; i++) {
        task = robocop.tasks[i];
        if (task.condition(payload)) task.method(payload);
    }
    res.end('ok');
});

