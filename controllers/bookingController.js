const Booking = require("../models/booking");

// Customer submits an inquiry
const createBooking = async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);

        res.status(201).json({
            success: true,
            data: newBooking
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to submit inquiry",
            error: error.message
        });
    }
};

// Admin views all inquiries
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("package", "title type price")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch inquiries",
            error: error.message
        });
    }
};

module.exports = {
    createBooking,
    getBookings
};