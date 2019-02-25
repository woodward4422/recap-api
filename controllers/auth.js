const User = require('../models/user')
const jwt = require('jsonwebtoken');



module.exports = (app) => {

    app.post("/sign-up", (req, res) => {
        const user = User(req.body)
        console.log(user)
        user
            .save()
            .then(user => {
                console.log("In the user then")
                res.json(user)
            })
    });



}