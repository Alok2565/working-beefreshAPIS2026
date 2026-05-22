const brandModel = require("../../models/products/BrandModel");
const permissionModel = require("../../models/PermissionModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

// ================= CREATE =================
exports.createBrand = async (req, res, next) => {
    try {
        const { brand_name, brand_slug } = req.body;

        if (!brand_name) {
            return next(new ApiError("brand name is required", 400));
        }

        const result = await withTransaction(async (client) => {
            const brand = await brandModel.createRecord(
                [brand_name, brand_slug || null],
                client,
            );
            const brandId = brand.rows[0].id;
            return brand;
        });

        logger.info("brand created successfully", {
            brand_name,
        });
        res.status(201).json({
            success: true,
            message: "brand created successfully",
            data: result.rows[0],
        });
    } catch (err) {
        console.log("CREATE brand ERROR:", err);

        if (err.code === "23505") {
            return next(new ApiError("brand already exists", 400));
        }

        return next(new ApiError("Failed to create brand", 500));
    }
};

// GET ALL

exports.getBrands = async (req, res, next) => {
    try {
        const result = await brandModel.getRecords();

        res.status(200).json({
            success: true,
            message: "brands retrieved successfully",
            data: result.rows,
        });
    } catch (err) {
        return next(new ApiError("Failed to retrieve brands", 500));
    }
};

// GET BY ID

exports.getBrandById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await brandModel.getRecordById(id);

        if (result.rows.length === 0) {
            return next(new ApiError("brand not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "brand retrieved successfully",
            data: result.rows[0],
        });
    } catch (err) {
        return next(new ApiError("Failed to retrieve brand", 500));
    }
};

// UPDATE

exports.updateBrand = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { brand_name, brand_slug, permissions = [] } = req.body;

        if (!brand_name) {
            return next(new ApiError("brand name is required", 400));
        }

        const result = await withTransaction(async (client) => {
            const updatedbrand = await brandModel.updateRecord(
                [brand_name, brand_slug || null, id],
                client,
            );
            return updatedbrand;
        });

        if (result.rows.length === 0) {
            return next(new ApiError("brand not found", 404));
        }

        logger.info("brand updated successfully", {
            id,
        });

        res.status(200).json({
            success: true,
            message: "brand updated successfully",
            data: result.rows[0],
        });
    } catch (err) {
        console.log(err);

        return next(new ApiError("Failed to update brand", 500));
    }
};

// STATUS UPDATE
exports.updateBrandStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await brandModel.updateStatus(id);

        if (result.rows.length === 0) {
            return next(new ApiError("brand not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "brand status updated successfully",
            data: result.rows[0],
        });
    } catch (err) {
        return next(new ApiError("Failed to update brand status", 500));
    }
};

// SOFT DELETE

exports.softDeleteBrand = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await brandModel.softDeleteRecord(id);

        if (result.rows.length === 0) {
            return next(new ApiError("brand not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "brand deleted successfully",
        });
    } catch (err) {
        return next(new ApiError("Failed to delete brand", 500));
    }
};

// RESTORE

exports.restoreBrand = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await brandModel.restoreRecord(id);

        if (result.rows.length === 0) {
            return next(new ApiError("brand not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "brand restored successfully",
        });
    } catch (err) {
        return next(new ApiError("Failed to restore brand", 500));
    }
};

// HARD DELETE
exports.deleteBrand = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await brandModel.deleteRecord(id);

        if (result.rowCount === 0) {
            return next(new ApiError("brand not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "brand permanently deleted",
        });
    } catch (err) {
        return next(new ApiError("Failed to delete brand", 500));
    }
};
