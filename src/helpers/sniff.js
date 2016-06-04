function isAddition(line) {
    return line[0] === '+';
}

var sniff = function(files, filetype, word, action) {
    var filename, extension, changes;
    for (var i = 0; i < files.length; i++) {
        filename = files[i].name;
        extension = filename.substr(filename.lastIndexOf('.'));
        if (extension === '.' + filetype) {
            changes = files[i].changes;
            for (var j = 0; j < changes.length; j++) {
                if (isAddition(changes[j])) {
                    if (changes[j].indexOf(word) !== -1) {
                        action(filename, j);
                    }
                }
            }
        }
    }
};

robocop.helpers.sniff = sniff;

