const express = require('express');
const passport = require('passport');
const http = require('http');
const jenkinsapi = require('jenkins-api');
const fs = require('fs');
const xml2js = require('xml2js');

const links = require('../links');
const secrets = require('../secrets');
const remoteTokenLogin = require('../remote-token-login');

const Project = require('../models/Project');

const router = express.Router();

const jenkinsToken = secrets.jenkinsToken;
const jenkinsAuthUrl = remoteTokenLogin(links.jenkins, secrets.jenkinsUser, secrets.jenkinsToken);
const jenkins = jenkinsapi.init(jenkinsAuthUrl);

router.get('/jobs', passport.authenticate('jwt', { session: false }), (req, res) => {
    jenkins.all_jobs({ token: 'jenkins-token' }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Some server error occurred' });
        } else {
            res.json({
                success: true, message: data.map((job) => {
                    return {
                        name: job.name,
                        url: job.url
                    }
                })
            });
        }
    });
});

router.post('/createNewJob', passport.authenticate('jwt', { session: false }), (req, res) => {
    fs.readFile(__dirname + '/../jenkins-job-config.xml', (err, data) => {
        const xmlParser = new xml2js.Parser();
        xmlParser.parseString(data, (err, json) => {
            json['flow-definition']['displayName'] = req.body.jobName

            const xmlBuilder = new xml2js.Builder();
            const configXml = xmlBuilder.buildObject(json);
            jenkins.create_job(req.body.jobName, configXml, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Some server error occurred' });
                } else {
                    res.json({
                        success: true, message: {
                            name: data.name,
                            url: data.url
                        }
                    });
                }
            });
        });
    });
});

router.post('/scheduleBuild', passport.authenticate('jwt', { session: false }), (req, res) => {
    Project.findOne({
        name: req.body.jobName
    }).then(project => {
        jenkins.build_with_params(req.body.jobName, {
            depth: 1, 
            projectLocation: project.location,
            token: 'jenkins-token'
        }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({success: false, message: err});
            } else {
                console.log(data);
                res.json({
                    success: true
                })
            }
        });
    }).catch(err => console.log(err));
});

module.exports = router;