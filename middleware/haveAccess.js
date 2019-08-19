function haveAccess (req, res, next) {
    if (req.user._info === req.params.id) {
        next();
    }
    else {
        return res.status(403).send("Access denied");
    }
}

module.exports = haveAccess;