"use strict"

const express = require("express");
const path = require("path");
const fs = require("fs");
//const cookieParser = require("cookie-parser");
const multer = require("multer")
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth.js");
const uploadRoute = require("./routes/upload.js");
const homeRoute = require("./routes/home.js");
const config = require("./config.js");
const utils = require("./utils/utils.js");
const util = new utils();
// const sqlhelper = require("./utils/sqlhelper.js");
// const sql = new sqlhelper();



const app = express();


// Init
if (!fs.existsSync(config.config.uploadsDir)) {
  fs.mkdirSync(config.config.uploadsDir);
}


// Middleware to generate a unique folder for the current upload
app.use((req, res, next) => {
  req.uploadFolder = util.generateLink(6);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


// Routes

app.use("/api", authRoutes);
app.use("/api", uploadRoute);
app.use("/api", homeRoute);


app.use('/files', express.static(config.config.uploadsDir));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
