const multer = require("multer");
const path = require("path");
const fs = require("fs");

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


module.exports = upload;