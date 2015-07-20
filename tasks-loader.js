require("fs").readdirSync('./tasks').forEach(function(file) {
      require("./tasks/" + file);
});
