
function admin (req, res, next) {
    if (req.currentUser._role === "admin") {
        next();
    }
    else {
        return res.status(403).send("Access denied");
    }
}

module.exports = admin;