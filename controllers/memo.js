const Memo = require('../models/memo');
const User = require('../models/user');

module.exports = (app) => {

    app.post("/memos/new", (req, res) => {

        var memo = new Memo(req.body);
        memo.author = req.user._id;
        console.log("Request User: " + req.user._id)
        console.log("Created Memo: " + memo)

        if (req.user) {
            console.log("We have a user!")
            memo
                .save()
                .then(memo => {
                    console.log("Memo: " + memo);
                    return User.findById(req.user._id);
                })
                .then(user => {
                    console.log("User: " + user);
                    user.memos.unshift(memo);
                    user.save();
                    res.json(memo)
                    return res.status(200);

                })
                .catch(err => {
                    console.log(err.message);
                })
        } else {
            console.log("Unauthorized User");
            return res.status(401);
        }


    });


    app.get("/memos/", (req, res) => {
        if (req.user) {



        } else {
            console.log("Unauthorized User")
            return res.status(401)
        }
    });


}