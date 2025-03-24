"use strict"

const express = require("express");
const path = require("path");
const fs = require("fs");
//const cookieParser = require("cookie-parser");
const multer = require("multer")

const utils = require("./utils/utils.js");

const util = new utils();
const app = express();

let downloadLinks = [];
let downloadLink = ""

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/" + downloadLink);
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

app.get('/api/signin', (req, res) => { // Might change back to post
  downloadLink = util.generateLink(10);
  downloadLinks.push(downloadLink)
  res.send(downloadLinks);
});

app.post('/api/signup', (req, res) => {
});

app.get('/api/link/:link', (req, res) => {
  if (downloadLinks.includes(req.params.link)) {
    res.send("YEs");
  } else {
    res.send("no");
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
