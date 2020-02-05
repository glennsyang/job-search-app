const express = require('express')
const app = express()
const port = 3001

var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

app.get('/api/jobs', async (req, res) => {
    const jobs1 = JSON.parse(await getAsync('github'));
    console.log('getting github from redis:', jobs1.length);

    const jobs2 = JSON.parse(await getAsync('remoteok'));
    console.log('getting remoteok from redis:', jobs2.length);

    const allJobs = jobs1.concat(jobs2);
    allJobs.sort((a, b) => (new Date(a.created_at) < new Date(b.created_at)) ? 1 : -1)

    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    return res.send(allJobs);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))