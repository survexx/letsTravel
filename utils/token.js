require("dotenv").config();
const jwt =  require("jsonwebtoken");

function jwtTokenGen(data){
    const payload = {
        id: data._id,
        email: data.email,
        name: data.name,
        role: data.role,
        img: data.profileImg
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
} 

function jwtTokenVerification(token){
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    return payload;
}

module.exports = {
    jwtTokenGen,
    jwtTokenVerification
}