
const db = require("../config/database_connection");

const ApiError = require("../utils/ApiError");
const withTransaction = require("../utils/transaction");


const {
    createProduct,
} = require("../models/products/productModel");

const {
    createVariant,
} = require("../models/products/productVariantModel");

const {
    createProductImage,
} = require("../models/products/productImageModel");

const {
    createProductMeta,
} = require("../models/products/productMetaModel");

const {
    createAttributeMapping,
} = require("../models/products/productAttributeMappingModel");



const getFullProductService = (data, client = db) => {
    return client.query(
        // `SELECT * FROM products  ORDER BY id DESC;`,
        // `SELECT p.product_name, p.sku, p.brand_id FROM products as p ORDER BY p.id DESC;`,
        `SELECT DISTINCT p.id, p.product_name, p.sku, p.thumbnail_image,p.created_at,pv.price,cat.category_name,b.brand_name
        FROM products AS p 
        LEFT JOIN product_variants AS pv ON pv.product_id = p.id
        LEFT JOIN categories as cat on p.category_id=cat.id
        LEFT JOIN brands as b on p.brand_id = b.id
        ORDER BY p.id DESC;`,
        data,
    )
}

const createFullProductService = async (
    productData,
    variants,
    attributes,
    images,
    meta
) => {
    return await withTransaction(async (client) => {

        // CREATE PRODUCT
        const productResult = await createProduct(
            [
                productData.category_id,
                productData.product_name,
                productData.slug,
                productData.sku,
                productData.brand_id,
                productData.short_description,
                productData.long_description,
                productData.thumbnail_image,
                productData.is_featured,
                productData.is_best_seller,
                productData.is_new_arrival,
                productData.seo_title,
                productData.seo_keywords,
                productData.seo_description,
                productData.sort_order,
                productData.status,
                productData.created_by,
            ],
            client
        );

        const product = productResult.rows[0];

        if (!product) {
            throw new ApiError(
                400,
                "Failed to create product"
            );
        }

        // STORE VARIANTS IDS

        const createdVariants = [];
        for (const variant of variants) {
            const variantSku =
                variant.sku ||
                `${productData.sku}-${variant.variant_name}`;
            const variantResult = await createVariant(
                [
                    product.id,

                    variant.tax_id || null,

                    variant.weight_unit_id || null,

                    variant.variant_name || null,

                    variantSku,

                    variant.barcode || null,

                    variant.weight === ""
                        ? null
                        : Number(variant.weight),

                    variant.price === ""
                        ? null
                        : Number(variant.price),

                    variant.discount_price === ""
                        ? null
                        : Number(variant.discount_price),

                    variant.low_stock_alert === ""
                        ? 5
                        : Number(variant.low_stock_alert),

                    true,

                    productData.created_by || null,
                ],
                client
            );
            createdVariants.push(
                variantResult.rows[0]
            );
        }

        // CREATE ATTRIBUTES
        for (const attr of attributes) {
            await createAttributeMapping(
                [
                    product.id,
                    attr.attribute_id,
                    attr.attribute_value_id,
                ],
                client
            );
        }

        // CREATE IMAGES
        for (const image of images) {

            // DEFAULT FIRST VARIANT
            const variantId =
                createdVariants[0]?.id || null;

            await createProductImage(
                [
                    product.id,
                    variantId,
                    image.image_path,
                    image.is_primary || false,
                    image.sort_order || 0,
                ],
                client
            );
        }

        // CREATE META
        await createProductMeta(
            [
                product.id,
                meta.meta_title || null,
                meta.meta_keywords || null,
                meta.meta_description || null,
                meta.canonical_url || null,
                JSON.stringify(
                    meta.schema_json || {}
                ),
                meta.og_image || null,
            ],
            client
        );

        return {
            product,
            variants: createdVariants,
        };
    });
};

module.exports = {
    createFullProductService,
    getFullProductService
}