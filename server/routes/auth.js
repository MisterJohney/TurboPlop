const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config.js");
const bodyParser = require("body-parser");

const sqlhelper = require("../utils/sqlhelper.js");
const sql = new sqlhelper();


router.post('/signin', async (req, res) => {
  // const sql = new sqlhelper();
  try {
    await sql.connect('turboplop.db');
    const isLoginValid = await sql.isValidLogin(req.body);
    
    if (isLoginValid) {
      const { username, password } = req.body;
      const token = jwt.sign({username, password}, config.config.secretKey);
      res.cookie("authcookie", token, {maxAge:900000,httpOnly:true});
      // res.json(isLoginValid);
      res.redirect("http://localhost:5173/home");
    } else {
      res.status(400).json({ message: "Username and/or password is wrong" });
    }
  } catch (error) {
    console.error(error);
  } finally {
    await sql.close();
  }
});

router.post('/signup', async (req, res) => {
  let isRegistered = await sql.registerUser(req.body);
  console.log(isRegistered);
  if (!isRegistered) {
    res.status(400).json({ message: "User not registered, becauce entered credentials were wrong"});
  } else {
    res.json({ message: 'User registered successfully' });
  }
});

module.exports = router;

