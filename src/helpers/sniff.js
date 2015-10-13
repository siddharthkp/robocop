var sniff = function(files, filetypes, word, action) {
    var filename, extension, changes;
    if (typeof filetypes === 'string') {
        filetypes = [filetypes];
    }
    for (var i = 0; i < files.length; i++) {
        filename = files[i].name;
        extension = filename.substr(filename.lastIndexOf('.') + 1);
        if (filetypes.indexOf(extension) !== -1) {
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
}

function isAddition(line) {
    return line[0] === '+';
}

robocop.helpers.sniff = sniff;
