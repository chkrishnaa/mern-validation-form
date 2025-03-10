const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
 res.json({ message: "Users route working!" });
});
router.post("/register", (req, res, next) => {
 const { name, email } = req.body;
 if (!name || !email) {
 return next(new Error("Name and Email are required"));
 }
 res.json({ message: "User registered successfully" });
});
module.exports = router;