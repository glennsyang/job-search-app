var CronJob = require('cron').CronJob;

const fetchGithub = require('./tasks/fetch-github');
const fetchRemoteOk = require('./tasks/fetch-remoteok');

// fetch github jobs
new CronJob('*/5 * * * *', fetchGithub, null, true, 'America/Los_Angeles');

// fetch remoteok jobs
new CronJob('*/5 * * * *', fetchRemoteOk, null, true, 'America/Los_Angeles');
