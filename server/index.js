const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
//const logger = require("morgan");
const cors = require("cors");

app.use("cors");
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.
})
