function checkRole(req, res, next){
    // console.log("User in checkRole:", req.user);
    if(!req.user){
        return res.redirect("/login");
    }
    if(req.user.role === "HOST"){
        return next();
    }
    return res.status(403).send("Not Authorized");
}

module.exports = checkRole;