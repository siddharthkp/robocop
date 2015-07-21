module.exports = {
    tasks: [],
    helpers: {
        register: function(name, condition, method) {
            var task = {
                name: name,
                condition: condition,
                method: method
            };
            robocop.tasks.push(task);
        },
        comment: function(message) {
            console.log(message);
        }
    }
};

