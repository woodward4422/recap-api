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
                    res.status(200)
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


    app.get("/users/memos/:id", (req, res) => {
        if (req.user) {
            User.findById(req.user._id)
                .then(user => {
                    Post.findById(req.params._id)
                        .then(post => {
                            res.status(200)
                            res.json(post)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log("Unauthorized User");
            return res.status(401);
        }
    });








}