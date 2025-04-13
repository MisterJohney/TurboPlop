const multer = require("multer");
const fs = require("fs");
const path = require("path");

const config = {
  db: {
      // TODO: add uses to theese
    location: "turboplop.db"
  },

  secretKey: "test",
  uploadsDir: path.join(__dirname, 'uploads')
}


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use the same folder for all files uploaded in the same request
    const folderName = req.uploadFolder; // Use the folder created before Multer processes files
    const folderPath = path.join(config.uploadsDir, folderName);

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

module.exports = { config, upload }
