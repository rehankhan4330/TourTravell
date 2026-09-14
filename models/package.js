const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: ["Hajj", "Umrah"],
            required: true
        },

        duration: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        hotel: {
            makkah: {
                name: String,
                category: String,
                distanceFromHaram: String
            },

            madinah: {
                name: String,
                category: String,
                distanceFromHaram: String
            }
        },

        itinerary: [
            {
                day: Number,
                title: String,
                description: String
            }
        ],

        inclusions: [
            {
                type: String
            }
        ],

        exclusions: [
            {
                type: String
            }
        ],

        transport: {
            type: String
        },

        visaIncluded: {
            type: Boolean,
            default: false
        },

        images: [
            {
                url: String,
                pubkicId: String
            }
        ],

        featured: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Package", packageSchema);