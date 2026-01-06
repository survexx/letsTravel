require("dotenv").config();
const data = require("./db");
const Hotel = require("../models/hotel");
const getConnection = require("../utils/dbConnection");

getConnection();

// to initialize database:
// 1. Delete all the data first
// 2. insert the data 

const initDB = async () =>{
    await Hotel.deleteMany({});
    await Hotel.insertMany(data);
    console.log("Data is Initialized");
}  

initDB();