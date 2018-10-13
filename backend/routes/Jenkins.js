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
});

module.exports = router;