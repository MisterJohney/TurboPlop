const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config.js");

const sqlhelper = require("../utils/sqlhelper.js");
const sql = new sqlhelper();


router.post('/signin', async (req, res) => {
  const sql = new sqlhelper();
  try {
    await sql.connect('turboplop.db');
    const isLoginValid = await sql.isValidLogin(req.body);
    
    if (isLoginValid) {
      const token = jwt.sign({req.body.username, req.body.password}, config.config.secretKey);
      res.cookie("authcookie", token, {maxAge:900000,httpOnly:true})
    } else {
      res.json(isLoginValid);
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
    res.json({ message: "User not registered, becauce entered credentials were wrong"});
  } else {
    res.json({ message: 'User registered successfully' });
  }
});

module.exports = router;

