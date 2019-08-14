const express = require('express');
const router = express.Router()

var email = require('../email')

router.post("/api/email", function (req, res) {

  var userEmailAddress = req.body.email;
  var userMessage = req.body.text;

  if (Array.isArray(userEmailAddress)) {
    userEmailAddress.toString()
    email(userEmailAddress, userMessage);
    res.json(true);
  }
  else {
    email(userEmailAddress, userMessage);
    res.json(true);
  }
  });

module.exports = router;

