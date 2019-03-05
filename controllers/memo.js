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
                    console.log("Memo: " + memo);
                    return User.findById(req.user._id);
                })
                .then(user => {
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


    app.get("/memos", (req, res) => {

        if (req.user) {
            User.findById(req.user._id).populate('memos')
                .then(user => {
                    res.json(user.memos)
                })
                .catch(err => {
                    console.log(err.message)
                });
        } else {
            console.log("Unauthorized User");
            return res.status(401);
        }
    });


    app.get("/memos/:memoID", (req, res) => {
        if (req.user) {
            Memo.findById(req.params.memoID)
                .then(memo => {
                    res.json(memo)
                })
        } else {
            console.log("Unauthorized User");
            return res.status(401);
        }
    });


    app.delete("")







}