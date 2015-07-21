var Github = require('github');
var github = new Github({
    version: "3.0.0",
    headers: {
        'user-agen': 'robocop'
    }
});
github.authenticate({
    type: "oauth",
    token: config.github_token
});
module.exports = {
    api: github
}

