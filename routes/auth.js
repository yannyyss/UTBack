const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../helpers/passport');
const sendActivationLink = require('../helpers/mailer').sendActivationLink;
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
    const hash = bcrypt.hashSync(req.body.email, bcrypt.genSaltSync(10)).split('/');
    req.body.confirmationCode = hash;
    User.register(req.body, req.body.password, (err, user) => {
        if (err) return res.json(err)
        else {
            // activation link
            sendActivationLink(user);
            //automatic login
            res.json(user);
        }
    })
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(500).send(info);
        res.json(user)
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
});



module.exports = router;