const User = require("../models/user");
const bcrypt = require("bcrypt");
const {jwtTokenGen} = require("../utils/token");


// user login
const handleUserLogin = async (req, res) =>{
    const {email, password} = req.body;
    console.log("PLAIN PASSWORD:", password);
    if(!email || !password) {
        return res.redirect("/login?error=fill_your_details");
    }
    const data = await User.findOne({email}).select("+password");
    
    if(!data){
        return res.redirect("/login?error=user_not_found");
    }
    console.log("Data:", data);
    const isPassMatch = await bcrypt.compare(password, data.password);
    console.log("COMPARE RESULT:", isPassMatch);
    if(!isPassMatch){
        return res.redirect("/login?error=invalid_credentials");
    }

    // remove password before token
    data.password = undefined;

    const token = jwtTokenGen(data);

    const loginHistoryUser = {
        loggedInAt: new Date(),
        ip: req.ip,
        userAgent: req.headers["user-agent"],
    }

    await User.findByIdAndUpdate(data._id,{
        $push: {
            loginHistory: {
                $each: [loginHistoryUser],
                $position: 0,
                $slice: 10
            }
        }
    });

    // httpOnly, secure, samesite: for XSS, CSRF attack prevention
    res.cookie("token", token, {
        httpOnly: true,
        // secure: false,
        secure: true,
        sameSite: "none"
    });

    if(data.role === "USER"){
        return res.redirect('/');
    }else{
        return res.redirect('/host/dashboard');
    }
}


// user creation
const handleUserCreation = async (req, res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.redirect("/signup?error=fill_all_details");
    };

    // checking whether user already exists or not
    const isExist = await User.findOne({ email });
    if(isExist){
        return res.redirect("/signup?error=user_already_exist");
    }

    // user creation
    // profile pic url will be generated using cloudinary and stored accordingly
    // const hashPass = await bcrypt.hash(password, 10);
    const data = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim()
    }
    await User.create(data);
    return res.redirect("/login");
}


const handleUserLogout = (req, res) =>{
    res.clearCookie("token");
    res.redirect("/");
}

const handleUserUpdate = async (req, res) => {
    const {name} = req.body;
    const id = req.user.id;
    console.log(req.file, name);
    const file = `/uploads/${req.file.filename}`; 
    await User.findByIdAndUpdate({_id: id}, {
        name,
        profileImg : file
    });
    return res.redirect("/user/profile");
}

module.exports = {
    handleUserCreation,
    handleUserLogin,
    handleUserUpdate,
    handleUserLogout
}