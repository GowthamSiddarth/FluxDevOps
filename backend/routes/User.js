const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');
const router = express.Router();

router.post('/register', function (req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.error("Error occurred", err);
                } else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            console.error("Error occurred", err);
                        } else {
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    var userObj = user.toJSON();
                                    const token = jwt.sign({ sub: userObj._id }, 'secret');
                                    userObj.token = token;
                                    delete userObj._id;
                                    delete userObj.__v;
                                    delete userObj.password;
                                    res.json(userObj);
                                })
                                .catch(err => console.error(err));
                        }
                    });
                }
            });
        }

    }).catch(err => console.error(err));
});

router.post('/login', function (req, res) {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = "User not found";
                res.status(400).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };

                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) {
                                console.error(err);
                            } else {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                    name: payload.name,
                                })
                            }
                        });
                    } else {
                        errors.password = 'Incorrect password';
                        res.status(400).json(errors);
                    }
                })
        });
})

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


module.exports = router;