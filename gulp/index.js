var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var websiteTasks = fs.readdirSync('./gulp/tasks/website/').filter(onlyScripts);
var dashboardTasks = fs.readdirSync('./gulp/tasks/dashboard/').filter(onlyScripts);

websiteTasks.forEach(function(task) {
  require('./tasks/website/' + task);
});

dashboardTasks.forEach(function(task) {
  require('./tasks/dashboard/' + task);
});
