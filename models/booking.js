const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Package",
            required: true
        },

        customerName: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            trim: true
        },

        groupSize: {
            type: Number,
            required: true
        },

        preferredDates: {
            type: String
        },

        budget: {
            type: Number
        },

        message: {
            type: String
        },

        status: {
            type: String,
            enum: ["pending", "contacted", "confirmed", "cancelled"],
            default: "pending"
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);