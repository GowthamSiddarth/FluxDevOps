const express = require('express');
const passport = require('passport');
const validateProjectLocation = require('../validation/projectLocation');

const Project = require('../models/Project');
const router = express.Router();

router.post('/createNewProject', passport.authenticate('jwt', { session: false }), function (req, res) {
    const { errors, isValid } = validateProjectLocation(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }

    Project.findOne({
        location: req.body.projectLocation
    }).then(project => {
        if (project) {
            errors.projectLocation = 'Job for Project already created!';
            return res.status(400).json(errors);
        } else {
            const newProject = new Project({
                location: req.body.projectLocation
            });

            newProject.save()
                .then(project =>{
                    var projectObj = project.toJSON();
                    delete projectObj._id;
                    delete projectObj.__v;                    
                    res.json(projectObj);
                })
                .catch(err => console.log(err));
        }
    }).catch(err => console.log(err));
});

module.exports = router;