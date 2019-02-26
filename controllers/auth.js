const User = require('../models/user')
const jwt = require('jsonwebtoken');



module.exports = (app) => {

    app.post("/users/new", (req, res) => {
        console.log(req.headers['authorization'])
        const user = User(req.body)
        user
            .save()
            .then(user => {
                var token = jwt.sign({
                    _id: user._id
                }, process.env.SECRET, {
                    expiresIn: "60 days"
                });
                res.json({
                    "token": token
                });
            })
            .catch(err => {
                console.log(err.message)
                return res.status(400).send({
                    err: err
                });
            })

    });

    // LOGIN
    app.post("/users/login", (req, res) => {
        const username = req.body.username;
        console.log("Username: " + username)
        // Find this user name
        User.findOne({
                username
            }, "username")
            .then(user => {
                if (!user) {
                    // User not found
                    return res.status(401).send({
                        message: "Wrong Username"
                    });
                } else {
                    const token = jwt.sign({
                        _id: user._id,
                        username: user.username
                    }, process.env.SECRET, {
                        expiresIn: "60 days"
                    });
                    res.json(token)
                }
            })
            .catch(err => {
                console.log(err);
            });
    });




}