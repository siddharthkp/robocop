var register = function(name, condition, method) {
    var task = {
        name: name,
        condition: condition,
        method: method
    };
    robocop.tasks.push(task);
}

robocop.helpers.register = register;

