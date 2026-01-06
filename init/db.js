const mongoose = require("mongoose");

const sampleData = [
  {
    title: "Sea Breeze Resort",
    description:
      "Wake up to the sound of waves at this peaceful seaside resort with breathtaking ocean views.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
      }
    ],
    pricePerNight: 4500,
    location: {
      address: "Beach Road",
      city: "Goa",
      state: "Goa",
      country: "India",
    },
    maxGuests: 4,
    amenities: ["WiFi", "Swimming Pool", "Beach Access", "AC", "Breakfast"],
    host: new mongoose.Types.ObjectId("665f1a9e2c9a4b6f1c100001"),
  },

  {
    title: "Mountain View Cottage",
    description:
      "A cozy cottage surrounded by lush mountains and scenic valley views.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
      }
    ],
    pricePerNight: 3200,
    location: {
      address: "Mall Road",
      city: "Manali",
      state: "Himachal Pradesh",
      country: "India",
    },
    maxGuests: 3,
    amenities: ["WiFi", "Heater", "Balcony", "Mountain View"],
    host: new mongoose.Types.ObjectId("665f1a9e2c9a4b6f1c100002"),
  },

  {
    title: "Urban Stay Deluxe",
    description:
      "A modern luxury hotel in the heart of the city with premium amenities.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
      }
    ],
    pricePerNight: 5000,
    location: {
      address: "MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
    },
    maxGuests: 2,
    amenities: ["WiFi", "Gym", "Lift", "AC"],
    host: new mongoose.Types.ObjectId("665f1a9e2c9a4b6f1c100003"),
  },

  {
    title: "Royal Heritage Palace",
    description:
      "Experience royal living in a heritage palace with timeless architecture.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
      }
    ],
    pricePerNight: 9000,
    location: {
      address: "Pink City",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
    },
    maxGuests: 5,
    amenities: ["WiFi", "Pool", "Breakfast", "Parking"],
    host: new mongoose.Types.ObjectId("665f1a9e2c9a4b6f1c100004"),
  },

  {
    title: "Backwater Bliss",
    description:
      "Traditional Kerala stay surrounded by peaceful backwaters and coconut trees.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80"
      }
    ],
    pricePerNight: 4800,
    location: {
      address: "Canal Road",
      city: "Alleppey",
      state: "Kerala",
      country: "India",
    },
    maxGuests: 3,
    amenities: ["WiFi", "Boat Ride", "Breakfast"],
    host: new mongoose.Types.ObjectId("665f1a9e2c9a4b6f1c100008"),
  }
];



module.exports = sampleData;
