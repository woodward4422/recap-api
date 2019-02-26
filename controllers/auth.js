const User = require('../models/user')
const jwt = require('jsonwebtoken');



module.exports = (app) => {

    app.post("/users/new", (req, res) => {
        const user = User(req.body)
        user
            .save()
            .then(user => {
                res.json(user)
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
                }
            })
            .catch(err => {
                console.log(err);
            });
    });




}