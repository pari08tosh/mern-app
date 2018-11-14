const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {

    User.getUser(req.body.username)
        .then(user => {
            if(user) {
                return res.status(400).json({
                    message: `Username Already Exists. Please choose a different one`
                });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password
                });

                User.addUser(newUser)
                    .then(user => {
                        return res.json({
                            message: `Registration Successfull. You can now login.`
                        });
                    })
                    .catch(err => {
                        console.log(`Error Registering User - ${err}`);
                        return res.status(500).json({
                        message: `Some error occured in your registration`
                        });
                    });
            }
        })
        .catch(err => {
            console.log(`Error Registering User - ${err}`);
            return res.status(500).json({
            message: `Some error occured in your registration`
            });
        });
});

router.post('/login', (req, res) => {
    User.getUser(req.body.username)
        .then(user => {
            if(user) {
                if(user.password === req.body.password) {
                    const token = jwt.sign({ id: user._id, username: user.username }, config.secret, { expiresIn: '7d' });
                    return res.json({
                        username: user.username,
                        token: token,
                        name: user.name
                    });
                } else {
                    return res.status(400).json({
                        message: `Invalid Credentials.`
                    });
                }
            } else {
                return res.status(400).json({
                    message: `Invalid Credentials.`
                });
            }
        })
        .catch(err => {
            console.error(`Error Fetching User - ${err}`);
            return res.status(500).json({
                message: `Something Went Wrong`
            });
        });
});

module.exports = router;