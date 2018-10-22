const express = require('express');
const passport = require('passport');
const http = require('http');
const jenkinsapi = require('jenkins-api');
const fs = require('fs');
const xml2js = require('xml2js');

const links = require('../links');
const secrets = require('../secrets');
const remoteTokenLogin = require('../remote-token-login');
const validateProjectDetails = require('../validation/projectDetails');

const Project = require('../models/Project');
const JenkinsJob = require('../models/JenkinsJob');
const ProjectLocation = require('../models/ProjectLocation');

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
    console.log(req.body);
    fs.readFile(__dirname + '/../jenkins-job-config.xml', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error occurred when reading config.xml' });
        }

        const xmlParser = new xml2js.Parser();
        xmlParser.parseString(data, (err, json) => {
            json['flow-definition']['displayName'] = req.body.projectName

            const xmlBuilder = new xml2js.Builder();
            const configXml = xmlBuilder.buildObject(json);

            const { errors, isValid } = validateProjectDetails(req.body);

            if (!isValid) {
                res.status(400).json(errors);
            }

            JenkinsJob.findOne({
                'project.location.path': req.body.projectLocation
            }).then(job => {
                if (job) {
                    errors.projectLocation = 'Job for Project Location already created!';
                    return res.status(400).json(errors);
                } else {
                    JenkinsJob.findOne({
                        'project.name': req.body.projectName
                    }).then(job => {
                        if (job) {
                            errors.projectName = 'Job for Project Name already created!';
                            return res.status(400).json(errors);
                        } else {
                            const newProjectLocation = new ProjectLocation({
                                scm: req.body.projectLocationType,
                                path: req.body.projectLocation,
                            });

                            const newProject = new Project({
                                location: newProjectLocation,
                                name: req.body.projectName,
                                type: req.body.projectType,
                                buildCommand: req.body.buildCommand,
                                deployCommand: req.body.deployCommand,
                            });

                            const newJenkinsJob = new JenkinsJob({
                                name: req.body.projectName,
                                project: newProject,
                            });

                            newJenkinsJob.save()
                                .then(project => {
                                    jenkins.create_job(req.body.projectName, configXml, (err, data) => {
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
                                })
                                .catch(err => {
                                    console.log(err);
                                    return res.status(500).json({ message: 'Some server error occurred' });
                                });
                        }
                    }).catch(err => console.error(err));
                }
            }).catch(err => console.log(err));
        });
    });
});

router.get('/getJobDetails/:jobName', passport.authenticate('jwt', { session: false }), (req, res) => {
    JenkinsJob.findOne({
        name: req.params.jobName
    }).then(job => {
        res.json({
            success: true,
            message: {
                buildCommand: job.project.buildCommand,
                deployCommand: job.project.deployCommand
            }
        })
    }).catch(err => console.log(err));
});

router.post('/scheduleBuild', passport.authenticate('jwt', { session: false }), (req, res) => {
    JenkinsJob.findOne({
        name: req.body.jobName
    }).then(job => {
        jenkins.build_with_params(req.body.jobName, {
            depth: 1,
            projectLocation: job.project.location.path,
            buildCommand: job.project.buildCommand,
            deployCommand: job.project.deployCommand,
            token: 'jenkins-token'
        }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ success: false, message: err });
            } else {
                res.json({
                    success: true
                })
            }
        });
    }).catch(err => console.log(err));
});

module.exports = router;