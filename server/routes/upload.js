const express = require("express");
const router = express.Router();
const multer = require("multer");

const config = require("../config.js");


router.post('/upload', config.upload.array('upload-files', 10), (req, res) => {
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

module.exports = router;
