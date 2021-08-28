const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome to YelpCamp ${registeredUser.username}!`);
            res.redirect('/campgrounds');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/users/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', `Welcome back ${req.user.username}!`);
    const redirectURL = req.session.redirectURL ? req.session.redirectURL : '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectURL);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out successfully!');
    res.redirect('/campgrounds');
});

module.exports = router;