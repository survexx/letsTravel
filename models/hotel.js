const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description : {
        type: String,
         required: true
    },
    images: [
        { url : {type: String}}
    ],
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: {type:String, required: true},
      country: { type: String, required: true },
    },
    maxGuests: {
        type: Number, 
        required: true,
        min: 1,
    },
    amenities: {
        type: [String],
        default: []
    },
    host: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    
}, {timestamps: true});


const Hotel = mongoose.model("hotels", HotelSchema);
module.exports = Hotel;