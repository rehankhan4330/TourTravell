const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array().map((err) => ({ field: err.path, message: err.msg }))
        });
    }
    next();
};

const validatePackage = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("type").isIn(["Hajj", "Umrah"]).withMessage("Type must be Hajj or Umrah"),
    body("duration").isNumeric().withMessage("Duration must be a number"),
    body("price").isNumeric().withMessage("Price must be a number"),
    handleValidationErrors
];

const validateBooking = [
    body("customerName").trim().notEmpty().withMessage("Customer name is required"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("groupSize").isNumeric().withMessage("Group size must be a number"),
    body("email").optional({ checkFalsy: true }).isEmail().withMessage("Invalid email format"),
    handleValidationErrors
];

module.exports = {
    validatePackage,
    validateBooking
};