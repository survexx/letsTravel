const mongoose = require("mongoose");

async function getConnection(){
    await mongoose.connect(process.env.MONGO_URL)
    .then(() =>{
        console.log("Database Connected");
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = getConnection;