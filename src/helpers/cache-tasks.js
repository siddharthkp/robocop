var request = require('request');
var fs = require('fs-extra');
fs.emptyDirSync('cached_tasks');

var tasksFound = 0;
var globalCallback;

var cacheTasks = function(callback) {
    globalCallback = callback;
    getRepoTree(function(tree){
        filterTaskFiles(tree, function(taskFiles) {
            downloadFiles(taskFiles);
        })
    });
}

function getRepoTree(callback) {
    var url = 'https://api.github.com/repos/';
    url += config.repo_owner + '/';
    url += config.repo_name + '/';
    url += 'git/trees/adding-robocop-tasks';
    url += '?recursive=1';
    url += '&access_token=' + config.github_token;
    var options = {
        url: url,
        headers: {
            'User-Agent': 'robocop'
        }
    };

    request(options, function(error, response, body) {
        var data = JSON.parse(body);
        if (data.truncated) {
            console.log('Some tasks might be missed! Please report as a bug.');
        }
        var tree = data.tree;
        callback(tree);
    });
}

function filterTaskFiles(tree, callback) {
    var directory = config.tasks_directory;
    var taskFiles = [];
    for (var i = 0; i < tree.length; i++) {
        if (tree[i].path.lastIndexOf(directory + '/', 0) === 0) {
            taskFiles.push({
                name: tree[i].path.replace(directory + '/', ''),
                url: tree[i].url
            });
        }
    }
    tasksFound = taskFiles.length;
    console.log('Caching ' + tasksFound + ' tasks');
    callback(taskFiles);
}

function downloadFiles(taskFiles) {
    for (var i = 0; i < taskFiles.length; i++) {
        downloadFile(taskFiles[i].name, taskFiles[i].url);
    }
}

function downloadFile(name, url) {
    var options = {
        url: url + '?access_token=' + config.github_token,
        headers: {
            'User-Agent': 'robcop',
        }
    };

    request(options, function(error, response, body) {
        var data = JSON.parse(body);
        var contents = new Buffer(data.content, 'base64').toString('ascii');
        fs.writeFile('cached_tasks/' + name, contents);
        incrementTasksCounter();
    });
}

var tasksCached = 0;
function incrementTasksCounter() {
    tasksCached++;
    if (tasksCached === tasksFound) {
        console.log(tasksCached + ' tasks cached');
        tasksCached = 0; // resetting for self-update
        if (globalCallback) globalCallback();
    }
}

robocop.helpers.cacheTasks = cacheTasks;

