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

    console.log("Auth Token Passed In: " + req.headers['authorization'])
    if (typeof req.headers['authorization'] === "undefined" || req.headers['authorization'] === null) {
        console.log(req.headers['authorization'])
        req.user = null;
    } else {
        var token = req.headers['authorization'];
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
    res.status(200).send({
        message: "successfull"
    })
})


const port = process.env.PORT;
app.listen(port, () => console.log(`server up and running on port ${port}`));


module.exports = app