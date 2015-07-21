module.exports = {
    tasks: [],
    helpers: {
        register: function(task) {
            robocop.tasks.push(task);
        },
        comment: function(message) {
            console.log(message);
        }
    }
};

