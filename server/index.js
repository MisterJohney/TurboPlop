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


app.post('/api/signin', async (req, res) => {
  const sql = new sqlhelper();
  try {
    await sql.connect('turboplop.db');
    const isLoginValid = await sql.isValidLogin(req.body);
    res.json(isLoginValid);
  } catch (error) {
    console.error(error);
  } finally {
    await sql.close();
  }
});


app.post('/api/signup', async (req, res) => {
  let isRegistered = await sql.registerUser(req.body);
  console.log(isRegistered);
  if (!isRegistered) {
    res.json({ message: "User not registered, becauce entered credentials were wrong"});
  } else {
    res.json({ message: 'User registered successfully' });
  }
});

app.use('/files', express.static(uploadsDir));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
