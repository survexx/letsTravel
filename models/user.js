const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    profileImg: {
        type: String, 
        default: "/default/profileImg.png"
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN", "HOST"],
        default : "USER"
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    isActive: {
        type: Boolean,
        default: false
    },

    loginHistory: [
        {
            loggedInAt: { type: String},
            ip: String,
            userAgent: String,
        }
    ]
}, 
{timestamps: true});

// pre method
userSchema.pre('save', async function (){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("user", userSchema);


module.exports = User;