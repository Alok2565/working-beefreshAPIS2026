// const productAttributeModel = require("../../models/products/ProductAttributeModel");
// const permissionModel = require("../../models/PermissionModel");
// const ApiError = require("../../utils/ApiError");
// const logger = require("../../utils/logger");
// const withTransaction = require("../../utils/transaction");

// // ================= CREATE =================
// exports.createProductAttribute = async (req, res, next) => {
//   try {
//     const { attribute_name, attribute_slug, status } = req.body;

//     if (!attribute_name) {
//       return next(new ApiError("Attribute name is required", 400));
//     }

//     const result = await withTransaction(async (client) => {
//       const prodAttr = await productAttributeModel.createRecord(
//         [attribute_name, attribute_slug, status],
//         client,
//       );
//       const productAttributeId = prodAttr.rows[0].id;
//       return prodAttr;
//     });

//     logger.info("Product attribute created successfully", {
//       attribute_name,
//     });
//     res.status(201).json({
//       success: true,
//       message: "Product attribute created successfully",
//       data: result.rows[0],
//     });
//   } catch (err) {
//     console.log("CREATE PRODUCT ATTRIBUTE ERROR:", err);

//     if (err.code === "23505") {
//       return next(new ApiError("Product attribute already exists", 400));
//     }

//     return next(new ApiError("Failed to create product attribute", 500));
//   }
// };

// // GET ALL

// exports.getProductAttributes = async (req, res, next) => {
//   try {
//     const result = await productAttributeModel.getRecords();

//     res.status(200).json({
//       success: true,
//       message: "Product attributes retrieved successfully",
//       data: result.rows,
//     });
//   } catch (err) {
//     return next(new ApiError("Failed to retrieve product attributes", 500));
//   }
// };

// // GET BY ID

// exports.getProductAttributeById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const result = await productAttributeModel.getRecordById(id);

//     if (result.rows.length === 0) {
//       return next(new ApiError("Product attribute not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product attribute retrieved successfully",
//       data: result.rows[0],
//     });
//   } catch (err) {
//     return next(new ApiError("Failed to retrieve product attribute", 500));
//   }
// };

// // UPDATE

// exports.updateProductAttribute = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const { attribute_name, attribute_slug, status } = req.body;

//     if (!attribute_name) {
//       return next(new ApiError("Attribute name is required", 400));
//     }

//     const result = await withTransaction(async (client) => {
//       const updatedAttribute = await productAttributeModel.updateRecord(
//         [attribute_name, attribute_slug, status, id],
//         client,
//       );
//       return updatedAttribute;
//     });

//     if (result.rows.length === 0) {
//       return next(new ApiError("Product attribute not found", 404));
//     }

//     logger.info("Product attribute updated successfully", {
//       id,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Product attribute updated successfully",
//       data: result.rows[0],
//     });
//   } catch (err) {
//     console.log(err);

//     return next(new ApiError("Failed to update product attribute", 500));
//   }
// };

// // STATUS UPDATE
// exports.updateProductAttributeStatus = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const result = await productAttributeModel.updateStatus(id);

//     if (result.rows.length === 0) {
//       return next(new ApiError("Product attribute not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product attribute status updated successfully",
//       data: result.rows[0],
//     });
//   } catch (err) {
//     return next(new ApiError("Failed to update product attribute status", 500));
//   }
// };

// // SOFT DELETE

// exports.softDeleteProductAttribute = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const result = await productAttributeModel.softDeleteRecord(id);

//     if (result.rows.length === 0) {
//       return next(new ApiError("Product attribute not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product attribute deleted successfully",
//     });
//   } catch (err) {
//     return next(new ApiError("Failed to delete product attribute", 500));
//   }
// };

// // RESTORE

// exports.restoreProductAttribute = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const result = await productAttributeModel.restoreRecord(id);

//     if (result.rows.length === 0) {
//       return next(new ApiError("Product attribute not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product attribute restored successfully",
//     });
//   } catch (err) {
//     return next(new ApiError("Failed to restore product attribute", 500));
//   }
// };
// // HARD DELETE
// exports.deleteProductAttribute = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const result = await productAttributeModel.deleteRecord(id);

//     if (result.rowCount === 0) {
//       return next(new ApiError("Product attribute not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product attribute permanently deleted",
//     });
//   } catch (err) {
//     return next(new ApiError("Failed to delete product attribute", 500));
//   }
// };

// =====================================
// controllers/products/ProductAttributeController.js
// =====================================

const productAttributeModel = require("../../models/products/ProductAttributeModel");

const ApiError = require("../../utils/ApiError");

const logger = require("../../utils/logger");

const withTransaction = require("../../utils/transaction");

// ================= CREATE =================
exports.createProductAttribute = async (req, res, next) => {
  try {
    const { attribute_name, attribute_slug, description, sort_order, status } =
      req.body;

    if (!attribute_name) {
      return next(new ApiError("Attribute name is required", 400));
    }

    if (!attribute_slug) {
      return next(new ApiError("Attribute slug is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const createdAttribute = await productAttributeModel.createRecord(
        [
          attribute_name,
          attribute_slug,
          description || null,
          sort_order || 0,
          status ?? true,
        ],
        client,
      );

      return createdAttribute;
    });

    logger.info("Product attribute created successfully", {
      attribute_name,
    });

    res.status(201).json({
      success: true,
      message: "Product attribute created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log("CREATE PRODUCT ATTRIBUTE ERROR:", err);

    if (err.code === "23505") {
      return next(new ApiError("Product attribute already exists", 400));
    }

    return next(new ApiError("Failed to create product attribute", 500));
  }
};

// ================= GET ALL =================
exports.getProductAttributes = async (req, res, next) => {
  try {
    const result = await productAttributeModel.getRecords();

    res.status(200).json({
      success: true,
      message: "Product attributes retrieved successfully",
      data: result.rows,
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to retrieve product attributes", 500));
  }
};

// ================= GET BY ID =================
exports.getProductAttributeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await productAttributeModel.getRecordById(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Product attribute not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product attribute retrieved successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to retrieve product attribute", 500));
  }
};

// ================= UPDATE =================
exports.updateProductAttribute = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { attribute_name, attribute_slug, description, sort_order, status } =
      req.body;

    if (!attribute_name) {
      return next(new ApiError("Attribute name is required", 400));
    }

    if (!attribute_slug) {
      return next(new ApiError("Attribute slug is required", 400));
    }

    const result = await withTransaction(async (client) => {
      const updatedAttribute = await productAttributeModel.updateRecord(
        [
          attribute_name,
          attribute_slug,
          description || null,
          sort_order || 0,
          status,
          id,
        ],
        client,
      );

      return updatedAttribute;
    });

    if (result.rows.length === 0) {
      return next(new ApiError("Product attribute not found", 404));
    }

    logger.info("Product attribute updated successfully", {
      id,
      attribute_name,
    });

    res.status(200).json({
      success: true,
      message: "Product attribute updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log("UPDATE PRODUCT ATTRIBUTE ERROR:", err);

    if (err.code === "23505") {
      return next(new ApiError("Product attribute already exists", 400));
    }

    return next(new ApiError("Failed to update product attribute", 500));
  }
};

// ================= STATUS UPDATE =================
exports.updateProductAttributeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await withTransaction(async (client) => {
      return await productAttributeModel.updateStatus(id, client);
    });

    if (result.rows.length === 0) {
      return next(new ApiError("Product attribute not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product attribute status updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to update product attribute status", 500));
  }
};

// ================= SOFT DELETE =================
exports.softDeleteProductAttribute = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await withTransaction(async (client) => {
      return await productAttributeModel.softDeleteRecord(id, client);
    });

    if (result.rows.length === 0) {
      return next(new ApiError("Product attribute not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product attribute deleted successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to delete product attribute", 500));
  }
};

// ================= RESTORE =================
exports.restoreProductAttribute = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await withTransaction(async (client) => {
      return await productAttributeModel.restoreRecord(id, client);
    });

    if (result.rows.length === 0) {
      return next(new ApiError("Product attribute not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product attribute restored successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to restore product attribute", 500));
  }
};

// ================= HARD DELETE =================
exports.deleteProductAttribute = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await withTransaction(async (client) => {
      return await productAttributeModel.deleteRecord(id, client);
    });

    if (result.rowCount === 0) {
      return next(new ApiError("Product attribute not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product attribute permanently deleted",
    });
  } catch (err) {
    console.log(err);

    return next(new ApiError("Failed to delete product attribute", 500));
  }
};
