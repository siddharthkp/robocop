var randomQuote = function() {
    var quotes = [
        'Serve the public trust, protect the innocent, uphold the law.',
        'Come quietly or there will be... trouble.',
        'Stay out of trouble.',
        'You are under arrest. You have the right to remain silent.',
        'Yes, I am a cop.',
        'Dead or alive, you\'re coming with me.',
        'Looking for me?',
        'Excuse me. I have to go. Somewhere there is a crime happening.'
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
};

robocop.helpers.randomQuote = randomQuote;

