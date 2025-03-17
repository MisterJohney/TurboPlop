"use strict"

const express = require("express");
const path = require("path");
//const cookieParser = require("cookie-parser");
const multer = require("multer")

const app = express();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });


app.use("/uploads", express.static("uploads"));


app.get('/api', (req, res) => {
  res.json({"users": ["one", "two", "three"]});
});

app.post('/api/upload', upload.array("upload-files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
      return res.status(400).send("No file");
  }
  let downloadLinks = req.files.map(file => {
      // TODO: make so when downloading it downloads with uploaded name
    return `<a href="/uploads/${file.filename}" download>Download ${file.originalname}</a>`;
}).join('<br>');
    res.send(`
    <h2>Files uploaded successfully!</h2>
    <div>${downloadLinks}</div>
    <br>
  `);
});


app.listen(5000, () => {
  console.log("Server started on port 5000");
});
