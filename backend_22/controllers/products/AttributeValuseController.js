const attributeValueModel = require("../../models/products/AttributeValueModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

// ================= CREATE =================

exports.createAttributeValue = async (req, res, next) => {
  try {
    const {
      attribute_id,
      value_name,
      value_slug,
      value_code,
      status,
      description,
      sort_order,
    } = req.body;

    if (!attribute_id) {
      return next(new ApiError("Attribute is required", 400));
    }

    if (!value_name) {
      return next(new ApiError("Value name is required", 400));
    }

    const result = await withTransaction(async (client) => {
      return await attributeValueModel.createRecord(
        [
          attribute_id,
          value_name,
          value_slug,
          value_code || null,
          status ?? true,
          description || null,
          sort_order || 0,
        ],
        client,
      );
    });

    logger.info("Attribute value created successfully", {
      value_name,
    });

    res.status(201).json({
      success: true,
      message: "Attribute value created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log("CREATE ATTRIBUTE VALUE ERROR:", err);

    if (err.code === "23505") {
      return next(new ApiError("Attribute value already exists", 400));
    }

    return next(new ApiError("Failed to create attribute value", 500));
  }
};

// ================= GET ALL =================

exports.getAttributeValues = async (req, res, next) => {
  try {
    const result = await attributeValueModel.getRecords();

    res.status(200).json({
      success: true,
      message: "Attribute values retrieved successfully",
      data: result.rows,
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve attribute values", 500));
  }
};

// ================= GET BY ID =================

exports.getAttributeValueById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await attributeValueModel.getRecordById(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Attribute value not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Attribute value retrieved successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to retrieve attribute value", 500));
  }
};

// ================= UPDATE =================

exports.updateAttributeValue = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      attribute_id,
      value_name,
      value_slug,
      value_code,
      status,
      description,
      sort_order,
    } = req.body;

    const result = await withTransaction(async (client) => {
      return await attributeValueModel.updateRecord(
        [
          attribute_id,
          value_name,
          value_slug,
          value_code,
          status,
          description,
          sort_order,
          id,
        ],
        client,
      );
    });

    if (result.rows.length === 0) {
      return next(new ApiError("Attribute value not found", 404));
    }

    logger.info("Attribute value updated successfully", {
      id,
    });

    res.status(200).json({
      success: true,
      message: "Attribute value updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to update attribute value", 500));
  }
};

// ================= STATUS =================

exports.updateAttributeValueStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await attributeValueModel.updateStatus(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Attribute value not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Attribute value status updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    return next(new ApiError("Failed to update attribute value status", 500));
  }
};

// ================= SOFT DELETE =================

exports.softDeleteAttributeValue = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await attributeValueModel.softDeleteRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Attribute value not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Attribute value deleted successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete attribute value", 500));
  }
};

// ================= RESTORE =================

exports.restoreAttributeValue = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await attributeValueModel.restoreRecord(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Attribute value not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Attribute value restored successfully",
    });
  } catch (err) {
    return next(new ApiError("Failed to restore attribute value", 500));
  }
};

// ================= HARD DELETE =================

exports.deleteAttributeValue = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await attributeValueModel.deleteRecord(id);

    if (result.rowCount === 0) {
      return next(new ApiError("Attribute value not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Attribute value permanently deleted",
    });
  } catch (err) {
    return next(new ApiError("Failed to delete attribute value", 500));
  }
};
