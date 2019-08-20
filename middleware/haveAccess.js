function haveAccess (req, res, next) {
    if (req.currentUser._info === req.params.id || req.currentUser._email === req.params.id || req.currentUser._role==='admin') {
        next();
    }
    else {
        return res.status(403).send("Access denied");
    }
}

module.exports = haveAccess;