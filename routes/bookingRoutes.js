const express = require("express");
const router = express.Router();

const { createBooking, getBookings, updateBookingStatus } = require("../controllers/bookingController");
const protect = require("../middleware/authMiddleware");
const { validateBooking } = require("../middleware/validators");

router.post("/", validateBooking, createBooking);
router.get("/", protect, getBookings);
router.patch("/:id/status", protect, updateBookingStatus);

module.exports = router;