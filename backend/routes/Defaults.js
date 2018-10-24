const express = require('express');
const passport = require('passport');

const Defaults = require('../models/Defaults');

const router = express.Router();

router.post('/command', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body.projectType);
    Defaults.aggregate([
        { $unwind: "$commands" },
        { $match: { "commands.project_type": req.body.projectType } },
        { $project: { build_command: "$commands.build_command" } }
    ],
        (err, defaultCommand) => {
            if (err) {
                console.log(err)
                res.status(500).json({ success: false, message: 'Some Internal Server error occurred!' });
            }
            res.json({
                success: true,
                message: {
                    build_command: defaultCommand[0].build_command
                }
            });
        }
    )
});

module.exports = router;