var Github = require('github-api');
var github = new Github({
    token: "OAUTH_TOKEN",
    auth: config.access_token
});
module.exports = {
    api: github
}

