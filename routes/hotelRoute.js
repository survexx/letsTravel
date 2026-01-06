const express = require("express");
const Hotel = require("../models/hotel");
const router = new express.Router();


router.get("/:id", async (req, res) =>{
    const id = req.params.id;
    const user = req.user;
    if(!id){

    }
    const data = await Hotel.findById({_id : id});
    if(!data){

    }
    res.render("show", {
        hotelData : data,
        user
    });
});


module.exports = {
    hotelRouter : router
};