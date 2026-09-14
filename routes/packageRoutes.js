const express = require("express");
const router = express.Router();

const { getPackages, createPackage, getPackageById, updatePackage, deletePackage, uploadPackageImage, deletePackageImage } = require("../controllers/packageController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { validatePackage } = require("../middleware/validators");

router.get("/", getPackages);
router.get("/:id", getPackageById);
router.post("/", protect, validatePackage, createPackage);
router.put("/:id", protect, validatePackage, updatePackage);
router.delete("/:id", protect, deletePackage);
router.post("/:id/upload", protect, upload.single("image"), uploadPackageImage);
router.delete("/:id/image/:imageId", protect, deletePackageImage);
module.exports = router;