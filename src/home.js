app.get('/', function (req, res) {
    var quote = robocop.helpers.randomQuote();
    res.end(quote);
});

