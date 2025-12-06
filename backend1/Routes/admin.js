const express = require("express");
const router = express.Router();

// Hardcoded login
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

router.post("/adminlogin", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: "Admin logged in successfully" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
