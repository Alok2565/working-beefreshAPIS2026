const prodCateModel = require("../../models/products/CategoryModel");
const prodCatImgModel = require("../../models/products/CategoryImageModel");
const permissionModel = require("../../models/PermissionModel");
const { fetchCatDataById } = require("../../services/categoryService");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

// ================= CREATE CATEGORY =================
const createNewRecord = async (req, res, next) => {
  try {
    const { category_name, category_slug, description, permissions } = req.body;

    // ================= VALIDATION =================
    if (!category_name) {
      return next(new ApiError("Category name is required", 400));
    }

    // ================= TRANSACTION =================
    const result = await withTransaction(async (client) => {
      // ================= CATEGORY INSERT =================
      const ptCatData = [category_name, category_slug, description];

      const parentResult = await prodCateModel.createRecord(ptCatData, client);

      const catId = parentResult.rows[0].id;

      logger.info("Category created", {
        catId,
        category_slug,
      });

      // ================= CATEGORY IMAGE INSERT =================
      const imagePath = req.file ? req.file.filename : null;

      const isPrimary = true;
      const status = true;

      const childImgData = [catId, imagePath, isPrimary, status];

      const imgProdData = await prodCatImgModel.createImgRecord(
        childImgData,
        client,
      );

      logger.info("Category image created", {
        catId,
      });

      // ================= ASSIGN PERMISSIONS =================
      if (permissions && permissions.length > 0) {
        await permissionModel.assignPermissions(catId, permissions, client);
      }

      // ================= RESPONSE DATA =================
      const data = imgProdData.rows[0];
      const imageUrl = data.image
        ? `${process.env.BASE_URL}/${req.uploadFolder}/${data.image}`
        : null;

      return {
        parent_category: parentResult.rows[0],
        child_image: data,
      };
    });

    // ================= SUCCESS RESPONSE =================
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (err) {
    // ================= DUPLICATE ERROR =================
    if (err.code === "23505") {
      logger.warn("Duplicate entry error", {
        detail: err.detail,
        body: req.body,
      });

      return next(new ApiError("Duplicate entry", 400));
    }

    // ================= FOREIGN KEY ERROR =================
    if (err.code === "23503") {
      logger.warn("Foreign key error", {
        detail: err.detail,
      });

      return next(new ApiError("Invalid reference", 400));
    }

    // ================= GENERAL ERROR =================
    logger.error("Category creation failed", {
      message: err.message,
      stack: err.stack,
      body: req.body,
    });

    next(err);
  }
};
const fetchRecordsData = async (req, res, next) => {
  try {
    const resultParent = await prodCateModel.getRecords();

    logger.info("Categories fetched successfully", {
      totalCategories: resultParent.rows.length,
    });
    const resultChild = await prodCatImgModel.getImgRecords();

    logger.info("Category images fetched successfully", {
      totalImages: resultChild.rows.length,
    });

    // ================= MERGE DATA =================
    const categories = resultParent.rows.map((category) => {
      const images = resultChild.rows.filter(
        (img) => img.category_id === category.id,
      );

      return {
        ...category,
        images,
      };
    });

    logger.info("Category data merged successfully", {
      totalMergedCategories: categories.length,
    });

    // ================= RESPONSE =================
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });

    logger.info("Category response sent successfully", {
      responseCount: categories.length,
    });
  } catch (err) {
    logger.error("Category fetch failed", {
      message: err.message,
      stack: err.stack,
    });

    next(err);
  }
};

//  GET BY ID
const fetchRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await fetchCatDataById(id);

    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const category = {
      id: rows[0].id,
      category_name: rows[0].category_name,
      category_slug: rows[0].category_slug,
      description: rows[0].description,
      status: rows[0].status,
      created_at: rows[0].created_at,

      images: rows
        .filter((row) => row.image)
        .map((row) => ({
          id: row.image_id,
          image: row.image,
          is_primary: row.is_primary,
        })),
    };

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log("FETCH CATEGORY BY ID ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const updateRecordStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await prodCateModel.updateStatus(id);
    if (result.rows.length === 0) {
      return next(new ApiError("Banner not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Banner status updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    logger.error("Banner status update failed", err);
    next(err);
  }
};
const updateRecordData = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log("BODY :", req.body);
    console.log("FILE :", req.file);

    const { category_name, category_slug, description, image_id } = req.body;

    const image = req.file ? req.file.filename : null;

    const result = await withTransaction(async (client) => {
      // ================= UPDATE CATEGORY =================
      const parentResult = await prodCateModel.updateRecord(
        [category_name || null, category_slug || null, description || null, id],
        client,
      );

      if (parentResult.rows.length === 0) {
        throw new ApiError("Category not found", 404);
      }

      // ================= UPDATE IMAGE =================
      let childResult = {
        rows: [],
      };

      if (image && image_id) {
        childResult = await prodCatImgModel.updateImgRecord(
          [id, image, true, true, image_id],
          client,
        );
      }

      return {
        category: parentResult.rows[0],

        image: childResult.rows[0] || null,
      };
    });

    return res.status(200).json({
      success: true,

      message: "Category updated successfully",

      data: result,
    });
  } catch (err) {
    console.log("UPDATE CATEGORY ERROR :", err);

    next(err);
  }
};
// const updateRecordData = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const {
//       category_name,
//       category_slug,
//       description,
//       image,
//       is_primary,
//       status,
//       image_id,
//     } = req.body;

//     const result = await withTransaction(async (client) => {
//       const parentResult = await prodCateModel.updateRecord(
//         [category_name, category_slug, description, id],
//         client,
//       );

//       if (parentResult.rows.length === 0) {
//         throw new ApiError("Category not found", 404);
//       }

//       let childResult = {
//         rows: [],
//       };

//       if (image_id) {
//         childResult = await prodCatImgModel.updateImgRecord(
//           [id, image, is_primary ?? true, status ?? true, image_id],
//           client,
//         );
//       }

//       return {
//         category: parentResult.rows[0],

//         image: childResult.rows[0] || null,
//       };
//     });

//     return res.status(200).json({
//       success: true,

//       message: "Category updated successfully",

//       data: result,
//     });
//   } catch (err) {
//     logger.error("Category update failed", err);

//     next(err);
//   }
// };

//  SOFT DELETE
const softDeleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await prodCateModel.softDelete(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Banner not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Banner soft deleted successfully",
    });
  } catch (err) {
    logger.error("Soft delete failed", err);
    next(err);
  }
};

// RESTORE
const restoreDeletdRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await prodCateModel.restoreDelete(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Banner not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Banner restored successfully",
      data: result.rows[0],
    });
  } catch (err) {
    logger.error("Restore failed", err);
    next(err);
  }
};

// HARD DELETE
const deletedRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await prodCateModel.deleteRecord(id);

    if (result.rowCount === 0) {
      return next(new ApiError("Banner not found", 404));
    }

    logger.info("Banner permanently deleted", {
      BannerId: id,
      deletedBy: req.user?.id || null,
    });

    res.status(200).json({
      success: true,
      message: "Banner permanently deleted",
    });
  } catch (err) {
    if (err.code === "23503") {
      return next(new ApiError("Cannot delete banner, it is in use", 400));
    }

    logger.error("Delete failed", err);
    next(err);
  }
};
module.exports = {
  createNewRecord,
  fetchRecordsData,
  fetchRecordById,
  updateRecordStatus,
  updateRecordData,
  softDeleteRecord,
  restoreDeletdRecord,
  deletedRecord,
};
