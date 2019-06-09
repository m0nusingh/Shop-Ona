module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        console.log("srg");
        return res.redirect('/login');
    }
    next();
}