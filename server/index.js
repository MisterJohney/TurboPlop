"use strict"

const express = require("express");
const path = require("path");
const fs = require("fs");
//const cookieParser = require("cookie-parser");
const multer = require("multer")

const utils = require("./utils/utils.js");

const util = new utils();
const app = express();


// Init

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use the same folder for all files uploaded in the same request
    const folderName = req.uploadFolder; // Use the folder created before Multer processes files
    const folderPath = path.join(uploadsDir, folderName);

    // Ensure the folder exists before uploading the files
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Set the destination folder path for the file upload
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    // Preserve the original file name
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware to generate a unique folder for the current upload
app.use((req, res, next) => {
  // Generate a unique folder name for this request
  req.uploadFolder = util.generateLink(6);
  next(); // Proceed to the next middleware (Multer)
});

app.use("/uploads", express.static("uploads"));


// Routes

app.post('/api/upload', upload.array('upload-files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  // Get the folder name where the files are stored (it's the same for all files in this upload)
  const folderName = req.uploadFolder;

  // Create a list of URLs for each uploaded file
  const links = req.files.map(file => {
    return `http://localhost:5000/files/${folderName}/${file.filename}`;
  });

  // Respond with the list of file links
  res.json({ message: 'Files uploaded successfully', links });
});

//app.get('/api/signin', (req, res) => { // Might change back to post
//  link = util.generateLink(10);
//  links.push(link)
//  res.send(links);
//});
//
//app.post('/api/signup', (req, res) => {
//});
//

app.use('/files', express.static(uploadsDir));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
