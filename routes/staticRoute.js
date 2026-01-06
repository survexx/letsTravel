const express = require("express");
const Hotel = require("../models/hotel");
const router = new express.Router();

router.get("/", async (req, res) => {
    const data = await Hotel.find({}); 
    // console.log(req.user);
    return res.render("home", {
        data,
        user : req.user
    });
});

router.get("/login", (req, res) => {
    const user = req.user;
    const error  = req.query.error;
    return res.render("login", {
        user,
        error
    });
});

router.get("/signup", (req, res) =>{
    const error  = req.query.error;
    const user = req.user;
    return res.render("signup", {
        user,
        error
    });
});

router.get("/logout", (req, res) =>{
    res.clearCookie("token");
    return res.redirect("/");
});

router.get("/listing/:id", async (req, res) => {
    const hotelId = req.params.id;
    const hotelData = await Hotel.findOne({ _id: hotelId});
    // console.log(hotelData);
    res.render("show", {
        hotelData,
        user: req.user
    });
});


module.exports = {
    staticRouter : router
};