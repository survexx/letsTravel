const Hotel = require("../models/hotel");
const getCoordinates = require("../utils/getCoordinates");

const handleHotelCreation = async (req, res) =>{
    try {
        const {title, description, pricePerNight, address, city, state, country, maxGuests, amenities} = req.body;
        const images = req.files.map(file =>(
            {url: `/uploads/${file.filename}`}
        ));
        const hotel = await Hotel.create({
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
        
    }
    
    res.redirect("/host/properties");
}

module.exports = {
    handleHotelCreation
}