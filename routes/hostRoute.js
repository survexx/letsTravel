const express = require("express");
const Hotel = require("../models/hotel");
const router = new express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {handleHotelCreation} = require("../controllers/hotleControllers");
const User = require("../models/user");
const { handleUserUpdate } = require("../controllers/userControllers");

const uploadDir = path.join(__dirname, "../public/uploads");

// ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, uploadDir);
    },
    filename: (req, file, cb) =>{
        const uniquePrefix = Date.now();
        cb(null, req.user.id+"-" + uniquePrefix + "-" +file.originalname);
    }
});

const upload = multer({storage,
    fileFilter: (req, file, cb) =>{
        if(file.mimetype.startsWith("image/")){
            cb(null, true);
        }else{
            cb(new Error("Only images allowed"), false);
        }
    },
    limits : {
        fileSize: 1024*1024*2
    }
}); 


router.route("/profile")
.get(async (req, res) => {
    const user = await User.findById({_id: req.user.id});  
    return res.render("profile", {
        user
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


router.post("/listing/:id/delete", async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).send("Hotel not found");
        }
        if (req.user.id !== hotel.host.toString()) {
            return res.status(403).send("Not authorized to delete this listing");
        }
        await Hotel.findByIdAndDelete(id);
        res.redirect("/host/properties");

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});



router.route("/listing/:id/edit")
.get(async (req, res)=> {
    const id = req.params.id;
    const data = await Hotel.findById({_id : id});
    console.log(data);
    res.render("edit", {
        hotelData : data,
        user: req.user
    });
})
.post(async(req, res) => {
    const id = req.params.id;
    const {title, description, pricePerNight, address, city, state, country, maxGuests, amenities} = req.body;
    await Hotel.findByIdAndUpdate(id, {
        title, description: description.trim(), 
        pricePerNight: Number(pricePerNight),
        location: {
            address,
            city,
            state,
            country
        },
        maxGuests: Number(maxGuests),
        amenities
    });;
    return res.redirect(`/host/listing/${id}`);
});

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