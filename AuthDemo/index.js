const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notagoodsecret'}));

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    } else {
        next();
    }
};

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async(req, res) => {
    const { password, username } = req.body;
    const user = new User({username, password});
    await user.save();
    req.session.userId = user._id;
    res.redirect('/'); 
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser) {
        req.session.userId = foundUser._id;
        res.redirect('/secret');
    } else {
        res.send("Invalid password!")
    }
    
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});