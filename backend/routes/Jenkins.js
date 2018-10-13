const express = require('express');
const passport = require('passport');
const http = require('http');
const jenkinsapi = require('jenkins-api');

const links = require('../links');
const secrets = require('../secrets');
const remoteTokenLogin = require('../remote-token-login');

const router = express.Router();

const jenkinsToken = secrets.jenkinsToken;
const jenkinsAuthUrl = remoteTokenLogin(links.jenkins, secrets.jenkinsUser, secrets.jenkinsToken);
const jenkins = jenkinsapi.init(jenkinsAuthUrl);

router.get('/jobs', passport.authenticate('jwt', { session: false }), (req, res) => {
    jenkins.all_jobs({token: 'jenkins-token'}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({message: 'Some server error occurred'});
        } else {
            res.json({success: true, message: data.map((job) => {
                return {
                    name: job.name,
                    url: job.url
                }
            })});
        }
    });
    /*
    http.get(links.jenkins + '/api/json?pretty=true', (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            console.log(data);
            res.json({success: true, message: JSON.parse(data).jobs.map((job) => {
                return {
                    name: job.name,
                    url: job.url
                }
            })});
        });
    }).on("error", (err) => {
        console.log(err.message);
        res.status(400).json({ success: false, message: err.message })
    });
    */
});

module.exports = router;