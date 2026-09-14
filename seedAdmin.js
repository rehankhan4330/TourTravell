require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/admin");

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const existingAdmin = await Admin.findOne({ username: "admin" });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await Admin.create({
            username: "admin",
            password: hashedPassword
        });

        console.log("Admin created successfully");
        process.exit();

    } catch (error) {
        console.error("Error seeding admin:", error.message);
        process.exit(1);
    }
};

seedAdmin();