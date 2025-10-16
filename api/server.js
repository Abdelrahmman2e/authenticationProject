const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const vercelExpress = require("vercel-express");

require("dotenv").config({ path: "./config.env" });
const dbConnection = require("../config/dbConnection");
const authRouter = require("../routes/Auth");
const profileRouter = require("../routes/Profile");
const AppError = require("../utils/AppError");
const globalError = require("../middleware/errorHandlerMW");
const passport = require("passport");
const path = require("path");
require("../utils/passportSetup");

dbConnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(
  session({
    secret: "SecretKeyq@",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.use((req, res, nxt) => {
  return nxt(new AppError(`Can not find this route: ${req.originalUrl}`, 404));
});

app.use(globalError);

module.exports = vercelExpress(app);
