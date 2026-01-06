require("dotenv").config();
const express =  require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
const getConnection = require("./utils/dbConnection");
const { checkAuth } = require("./middlewares/auth");
const cookieParse = require("cookie-parser");
const {staticRouter} = require("./routes/staticRoute");
const {userRouter} = require("./routes/userRoute");
const {hotelRouter} = require("./routes/hotelRoute");
const {hostRouter} = require("./routes/hostRoute");
const ejsMate = require("ejs-mate");
const { requireAuth } = require("./middlewares/auth");
const checkRole = require("./middlewares/role");

// DataBase connection
getConnection();
app.use(cookieParse());

app.set("trust proxy", 1); 

// ejs engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

// path setup
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, "/public")));


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(checkAuth);


// Routes
app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/host", requireAuth, checkRole, hostRouter);
app.use("/hotel", hotelRouter);

app.listen(PORT, (req, res) => {
    console.log(`Server is listening at: http://localhost:${PORT}`);
});