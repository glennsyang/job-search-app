var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://remoteok.io/api';

async function fetchRemoteOk() {
    console.log('fetching remoteok');

    const res = await fetch(`${baseURL}`);
    const allJobs = await res.json();
    console.log('got', allJobs.length, 'jobs total');

    // filter algo
    const filteredJobs = allJobs.filter(job => {
        if (job.position) {
            const position = job.position.toLowerCase();
            job.source = "Remote OK";
            if (
                position.includes('senior') ||
                position.includes('manager') ||
                position.includes('sr.') ||
                position.includes('architect')
            ) {
                return false;
            }
            return true;
        }
    });

    const jrJobs = filteredJobs.map(function (job) {
        let newJob = {};
        newJob.title = job.position;
        newJob.company = job.company;
        newJob.location = '';
        newJob.company_logo = job.logo;
        newJob.description = job.description;
        newJob.created_at = job.date;
        newJob.url = job.url;
        newJob.tags = job.tags;
        newJob.source = job.source;
        return newJob;
    });

    console.log('filtered down to', jrJobs.length);

    // set in redis
    const success = await setAsync('remoteok', JSON.stringify(jrJobs));

    console.log({ success });
}

module.exports = fetchRemoteOk;