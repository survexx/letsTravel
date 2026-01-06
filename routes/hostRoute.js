const express = require("express");
const Hotel = require("../models/hotel");
const router = new express.Router();
const {handleHotelCreation, handleHotelDelete, handleHotelEdit} = require("../controllers/hostControllers");
const User = require("../models/user");
const { handleUserUpdate } = require("../controllers/userControllers");
const upload = require("../middlewares/upload");



router.route("/profile")
.get(async (req, res) => {
    const user = await User.findById({_id: req.user.id});  
    const error = req.query.error;
    return res.render("profile", {
        user,
        error
    });
})
.post(upload.single("profileImg"), handleUserUpdate);


router.route("/properties/new")
.get(async(req, res) => {
    const error  = req.query.error;
    const user = req.user;
    return res.render("add", {
        error,
        user
    });
})
.post(upload.array("images", 5), handleHotelCreation);



router.get("/dashboard", async(req, res) => {
    const hotelCount = await Hotel.countDocuments({ host: req.user.id });
    return res.render("hostDash",{
        user: req.user,
        hotelCount
    });
});


router.get("/properties", async (req, res) =>{
    const data = await Hotel.find({ host : req.user.id });
    return res.render("home", {
        data,
        user:req.user
    });
});


router.post("/listing/:id/delete", handleHotelDelete);


router.route("/listing/:id/edit")
.get(async (req, res)=> {
    const id = req.params.id;
    const data = await Hotel.findById({_id : id});
    // console.log(data);
    res.render("edit", {
        hotelData : data,
        user: req.user
    });
})
.post(handleHotelEdit);


router.get("/listing/:id", async(req, res) => {
    const id = req.params.id;
    const data = await Hotel.findById({_id : id});
    res.render("show", {
        hotelData : data,
        user: req.user
    }); 
});


module.exports = {
    hostRouter : router,
    upload : upload
};