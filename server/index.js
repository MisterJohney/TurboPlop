const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
//const logger = require("morgan");
const cors = require("cors");

const app = express();
//app.use("cors");
//app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api', (req, res) => {
  res.json({"users": ["one", "two", "three"]})
})

app.listen(5000, () => {
  console.log("Server started on port 5000");
})
