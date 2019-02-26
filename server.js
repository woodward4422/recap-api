const express = require('express')
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');




const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(expressValidator());
app.use(cookieParser());
app.use(express.static('public'));

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.token === "undefined" || req.token === null) {
        console.log(req.token)
        req.user = null;
    } else {
        var token = req.token;
        var decodedToken = jwt.decode(token, {
            complete: true
        }) || {};
        req.user = decodedToken.payload;
    }

    next();
};
app.use(checkAuth);


require('./controllers/auth.js')(app);
require('./controllers/memo.js')(app);
require('./data/recap-db');
require('dotenv').config();

app.get('/', (req, res) => {
    res.send("Hello")

})


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})


module.exports = app