const Hotel = require("../models/hotel");
const getCoordinates = require("../utils/getCoordinates");
const cloudinary = require("../utils/cloudinary");

const handleHotelCreation = async (req, res) =>{
    try {
        const {title, description, pricePerNight, address, city, state, country, maxGuests, amenities} = req.body;
        const imagesUploadPromises = req.files.map((file) => {
            return cloudinary.uploader.upload(file.path);
        });
        const uploadResult = await Promise.all(imagesUploadPromises);
        const images = uploadResult.map(img =>(
            { url: img.secure_url }
        ));
        console.log(images);
        await Hotel.create({
            title,
            description,
            images,
            pricePerNight: Number(pricePerNight), 
            location: {address, city, state, country},
            maxGuests: Number(maxGuests),
            amenities,
            host: req.user.id
        });

    } catch (error) {
        console.log(error);
        res.end("Something went wrong in hosting a property");
    }
    
    res.redirect("/host/properties");
}

const handleHotelDelete =  async (req, res) => {
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
}

const handleHotelEdit = async(req, res) => {
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
}

module.exports = {
    handleHotelCreation,
    handleHotelDelete,
    handleHotelEdit
}