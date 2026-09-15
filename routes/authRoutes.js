const express = require("express");
const router = express.Router();

const { loginAdmin, changePassword } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.put("/change-password", protect, changePassword);

module.exports = router;