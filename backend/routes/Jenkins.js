const express = require('express');
const passport = require('passport');
const http = require('http');
const links = require('../links');

const router = express.Router();

router.get('/jobs', passport.authenticate('jwt', { session: false }), (req, res) => {    
    http.get(links.jenkins + '/api/json?pretty=true', (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
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
});

module.exports = router;