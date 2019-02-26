const Memo = require('../models/memo');
const User = require('../models/user');

module.exports = (app) => {

    app.post("/memos/new", (req, res) => {
        var memo = new Memo(req.body);
        res.json(memo)
    });


}