const Booking = require("../models/booking");

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

const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["pending", "contacted", "confirmed", "cancelled"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate("package", "title type price");

        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedBooking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update inquiry status",
            error: error.message
        });
    }
};

module.exports = {
    createBooking,
    getBookings,
    updateBookingStatus
};