const {jwtTokenVerification} = require("../utils/token");

function checkAuth(req, res, next){
    try {
        const token = req.cookies?.token;
        if(!token){
            req.user = null;
            return next();
        }
        const payload = jwtTokenVerification(token);
        req.user = payload;
    } catch (error) {
        req.user = null
    }
    next();
}


function requireAuth(req, res, next){
    if(!req.user){
        return res.redirect("/login");
    }
    next();
}

module.exports = {
    checkAuth,
    requireAuth
}