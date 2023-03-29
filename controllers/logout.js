const logOut = (req, res) => {
    res.clearCookie("userRegistered");
    res.redirect("/");
}

module.exports = logOut;