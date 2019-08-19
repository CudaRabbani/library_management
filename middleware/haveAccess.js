function haveAccess (req, res, next) {
    if (req.user._email === req.params.id || req.user._role === 'admin') {
        next();
    }
    else {
        return res.status(403).send("Access denied");
    }
}

module.exports = haveAccess;