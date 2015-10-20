var sniff = function(files, filetype, words, action) {
    var filename, extension, changes;
    for (var i = 0; i < files.length; i++) {
        filename = files[i].name;
        extension = filename.substr(filename.lastIndexOf('.'));
        if (extension === '.' + filetype) {
            changes = files[i].changes;
            for (var j = 0; j < changes.length; j++) {
                if (isAddition(changes[j])) {
                    if (doAction(changes[j], words)) {
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

function doAction(change, words) {
    if (typeof words === 'string') {
        words = [words];
    }
    var regex = words.join('|');
    return (new RegExp(regex)).test(change);
}

robocop.helpers.sniff = sniff;

