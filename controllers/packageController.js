const Package = require("../models/package");
const cloudinary = require("../config/cloudinary");

const getPackages = async (req, res) => {
    try {
        const packages = await Package.find({ isActive: true });

        res.status(200).json({
            success: true,
            count: packages.length,
            data: packages
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch packages",
            error: error.message
        });
    }
};

const getPackageById = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);

        if (!package) {
            return res.status(404).json({
                success: false,
                message: "Package not found"
            });
        }

        res.status(200).json({
            success: true,
            data: package
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch package",
            error: error.message
        });
    }
};

const createPackage = async (req, res) => {
    try {
        const newPackage = await Package.create(req.body);

        res.status(201).json({
            success: true,
            data: newPackage
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create package",
            error: error.message
        });
    }
};

const updatePackage = async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedPackage
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update package",
            error: error.message
        });
    }
};

const deletePackage = async (req, res) => {
    try {
        const deactivatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!deactivatedPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Package deactivated successfully",
            data: deactivatedPackage
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete package",
            error: error.message
        });
    }
};

const uploadPackageImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided"
            });
        }

        const imageUrl = req.file.path;
        const imagePublicId = req.file.filename;

        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            { $push: { images: { url: imageUrl, publicId: imagePublicId } } },
            { new: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedPackage
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to upload image",
            error: error.message
        });
    }
};

const deletePackageImage = async (req, res) => {
    try {
        const { id, imageId } = req.params;

        const pkg = await Package.findById(id);

        if (!pkg) {
            return res.status(404).json({
                success: false,
                message: "Package not found"
            });
        }

        const image = pkg.images.id(imageId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }

        if (image.publicId) {
            try {
                await cloudinary.uploader.destroy(image.publicId);
            } catch (cloudErr) {
                console.error("Cloudinary delete failed (continuing anyway):", cloudErr.message);
            }
        }

        pkg.images.pull(imageId);
        await pkg.save();

        res.status(200).json({
            success: true,
            data: pkg
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete image",
            error: error.message
        });
    }
};

module.exports = {
    getPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage,
    uploadPackageImage,
    deletePackageImage
};