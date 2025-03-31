"use strict"

const express = require("express");
const path = require("path");
const fs = require("fs");
//const cookieParser = require("cookie-parser");
const multer = require("multer")
const bodyParser = require("body-parser");

const utils = require("./utils/utils.js");
const sqlhelper = require("./utils/sqlhelper.js");

const util = new utils();
const sql = new sqlhelper();

const app = express();


// Init

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use the same folder for all files uploaded in the same request
    const folderName = req.uploadFolder; // Use the folder created before Multer processes files
    const folderPath = path.join(uploadsDir, folderName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);  // Preserve the original file name
  }
});

const upload = multer({ storage: storage });

// Middleware to generate a unique folder for the current upload
app.use((req, res, next) => {
  req.uploadFolder = util.generateLink(6);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

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

function registerUser(form) {
  // Check username duplicates
  // TODO: add this

  const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
  const isValid = emailRegex.exec(form.email);
  if (!isValid) {
    return false;
  }

  if (form.password.length < 8) {
    return false;
  }

  if (form.password !== form.retypePassword) {
    return false
  }

  // Add to database
  sql.connect("./turboplop.db");
  sql.createUser(form)
  sql.close();
  return true;
}

app.post('/api/signup', (req, res) => {
  const signupInfo = req.body;
  let isRegistered = registerUser(req.body);
  if (!isRegistered) {
    res.json({ message: "User not registered, becauce entered credentials were wrong"})
  } else {
    res.json({ message: 'User registered successfully' });
  }
});


app.use('/files', express.static(uploadsDir));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
