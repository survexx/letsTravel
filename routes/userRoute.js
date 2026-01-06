const express = require("express");
const router = express.Router();
const {
    handleUserCreation,
    handleUserLogin,
    handleUserUpdate,
    handleUserLogout
} = require("../controllers/userControllers");
const { requireAuth } = require("../middlewares/auth");
const { upload } = require("./hostRoute");
const User = require("../models/user");

router.get("/profile",async (req, res) => {
    const user = await User.findById( {_id: req.user.id});
    const error = req.query.error;
    return res.render("profile", {
        user,
        error
    });
});
router.post("/login", handleUserLogin);
router.post("/signup", handleUserCreation);
router.get("/logout", handleUserLogout);
router.post("/profile/update", requireAuth, upload.single("profileImg"), handleUserUpdate);

module.exports = {
    userRouter : router
};