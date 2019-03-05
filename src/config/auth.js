const checkAuth = (req, res, next) => {

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

module.exports = checkAuth;