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

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async(req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/'); 
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    if (!user) {
        next();
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(validPassword) {
        req.session.userId = user._id;
        res.send("You are logged in!")
    } else {
        res.send("Invalid password!")
    }
    
});

app.get('/secret', (req, res) => {
    if(!req.session.userId) {
        res.redirect('/login');
    }
    res.send('Secret');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});