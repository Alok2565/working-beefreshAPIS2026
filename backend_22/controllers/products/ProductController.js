
const striptags = require('striptags')
const {
    createFullProductService,
    getFullProductService
} = require('../../services/productService')
const generateSlug = require('../../utils/slugify')
const ApiError = require('../../utils/ApiError')
const logger = require('../../utils/logger')

const createProductController = async (req, res, next) => {
    try {
        // console.log(req.headers.authorization);
        // console.log(req.user);
        const body = req.body
        // PRODUCT DATA
        const productData = {
            category_id: body.category_id,
            product_name: body.product_name,
            slug: generateSlug(body.product_name),
            sku: body.sku,
            brand_id: body.brand_id,

            short_description: striptags(body.short_description || ''),

            long_description: striptags(body.long_description || ''),

            // thumbnail_image: req.files?.thumbnail_image?.[0]?.path || null,
            thumbnail_image: req.files?.thumbnail_image?.[0]?.filename || null,

            is_featured: body.is_featured === 'true',

            is_best_seller: body.is_best_seller === 'true',

            is_new_arrival: body.is_new_arrival === 'true',

            seo_title: body.seo_title,

            seo_keywords: body.seo_keywords,

            seo_description: body.seo_description,

            sort_order: body.sort_order || 0,

            status: body.status === 'true',

            created_by: req.user?.id || null
        }

        const variants = JSON.parse(body.variants || '[]')

        // ATTRIBUTES
        const attributes = []

        if (body.flavor_id) {
            attributes.push({
                attribute_id: 1,
                attribute_value_id: body.flavor_id
            })
        }

        if (body.purity_id) {
            attributes.push({
                attribute_id: 2,
                attribute_value_id: body.purity_id
            })
        }

        if (body.packaging_id) {
            attributes.push({
                attribute_id: 3,
                attribute_value_id: body.packaging_id
            })
        }

        // META
        const meta = {
            meta_title: body.seo_title,

            meta_keywords: body.seo_keywords,

            meta_description: body.seo_description,

            canonical_url: body.canonical_url || null,

            schema_json: body.schema_json || {},

            og_image: null
        }

        // GALLERY IMAGES
        // const galleryImages =
        //     req.files?.gallery_images?.map(file => ({
        //         image_path: file.path,
        //         is_primary: false
        //     })) || []
        const galleryImages =
            req.files?.gallery_images?.map(
                (file) => ({
                    image_path: `${file.filename}`,

                    is_primary: false,
                })
            ) || [];

        // SERVICE CALL
        const result = await createFullProductService(
            productData,
            variants,
            attributes,
            galleryImages,
            meta
        )

        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: result
        })
    } catch (error) {
        console.log(error)

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}

const getProdctsRecordsList = async (req, res, next) => {
    try {
        const results = await getFullProductService();

        logger.info('Products fetched successfully', {
            totalProducts: results.rows.length,
        });

        return res.status(200).json({
            success: true,

            message: 'Products retrieved successfully',

            data: results.rows,
        });
    } catch (err) {
        logger.error('Products fetch failed', {
            message: err.message,
            stack: err.stack,
        });

        return next(new ApiError(500, 'Failed to retrieve products'));
    }
};


module.exports = {
    createProductController,
    getProdctsRecordsList
};