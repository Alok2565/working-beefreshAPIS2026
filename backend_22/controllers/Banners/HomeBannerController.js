const homeBannerModel = require("../../models/HomeBannerModel");
const permissionModel = require("../../models/PermissionModel");
const ApiError = require("../../utils/ApiError");
const logger = require("../../utils/logger");
const withTransaction = require("../../utils/transaction");

exports.createHomeBanner = async (req, res, next) => {
  try {
    const { name, slug, url, description, permissions } = req.body;

    if (!name) {
      return next(new ApiError("Banner name is required", 400));
    }

    const safeUrl = Array.isArray(url) ? url[0] : url;
    const safeDescription = Array.isArray(description)
      ? description[0]
      : description;

    const ipAddress = req.clientIP;

    //console.log("Client IP:", ipAddress);

    const imagePath = req.file ? req.file.filename : null;
    const result = await withTransaction(async (client) => {
      const banner = await homeBannerModel.createRecord(
        [
          name,
          slug || null,
          safeUrl || null,
          safeDescription || null,
          imagePath || null,
          ipAddress,
        ],
        client,
      );

      const bannerId = banner.rows[0].id;

      if (permissions && permissions.length > 0) {
        await permissionModel.assignPermissions(bannerId, permissions, client);
      }

      return banner;
    });

    let data = result.rows[0];

    data.image = data.image
      ? `${process.env.BASE_URL}/${process.env.UPLOAD_BANNER_PATH}/${data.image}`
      : null;

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data,
    });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
exports.getHomeBannersData = async (req, res, next) => {
  try {
    const result = await homeBannerModel.getRecords();

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    logger.error("Banner fetch failed", err);
    next(err);
  }
};

// GET BY ID
exports.getHomeBannerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await homeBannerModel.getRecordById(id);

    if (result.rows.length === 0) {
      return next(new ApiError("Banner not found", 404));
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    logger.error("Banner fetch by ID failed", err);
    next(err);
  }
};
// ================= UPDATE STATUS =================
exports.updateBannerStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await homeBannerModel.updateStatus(id);

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

// ✅ UPDATE (WITH IMAGE SUPPORT)
exports.updateHomeBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, slug, url, description } = req.body;

    if (!id) {
      return next(new ApiError("Banner ID is required", 400));
    }

    let imagePath = null;

    // Store only filename
    if (req.file) {
      imagePath = req.file.filename;
    }

    // Prevent array issue
    const safeUrl = Array.isArray(url) ? url[0] : url;

    const safeDescription = Array.isArray(description)
      ? description[0]
      : description;

    const result = await homeBannerModel.updateRecord([
      name,
      slug || null,
      safeUrl || null,
      safeDescription || null,
      imagePath || null,
      id, // IMPORTANT
    ]);

    if (result.rows.length === 0) {
      return next(new ApiError("Banner not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    if (err.code === "23505") {
      return next(new ApiError("Banner already exists", 400));
    }

    logger.error("Banner update failed", err);

    next(err);
  }
};

// ✅ SOFT DELETE
exports.softDeleteHomeBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await homeBannerModel.softDeleteRecord(id);

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

// ✅ RESTORE
exports.restoreHomeBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await homeBannerModel.restoreRecord(id);

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

// ✅ HARD DELETE
exports.deleteHomeBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await homeBannerModel.deleteRecord(id);

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
