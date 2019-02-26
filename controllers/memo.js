const Memo = require('../models/memo');
const User = require('../models/user');

module.exports = (app) => {

    app.post("/memos/new", (req, res) => {

        var memo = new Memo(req.body);
        memo.author = req.user._id;

        if (req.user) {
            memo
                .save()
                .then(memo => {
                    return User.findById(req.user._id);
                })
                .then(user => {
                    user.memos.unshift(memo);
                    user.save();
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