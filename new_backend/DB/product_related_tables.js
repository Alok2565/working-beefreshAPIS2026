-- =========================================================
-- BEE HONEY ECOMMERCE DATABASE
-- FINAL ENTERPRISE STRUCTURE
-- PostgreSQL
-- =========================================================

-- =========================================================
-- COMMON ENTERPRISE COLUMNS
-- =========================================================
-- status
-- is_deleted
-- created_by
-- updated_by
-- deleted_by
-- created_at
-- updated_at
-- deleted_at
-- =========================================================

-- =========================================================
-- 1. CATEGORIES
-- =========================================================

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,

    category_name VARCHAR(255) NOT NULL,

    slug VARCHAR(255) UNIQUE NOT NULL,

    image TEXT,

    description TEXT,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_by INTEGER REFERENCES users(id),

    updated_by INTEGER REFERENCES users(id),

    deleted_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

-- =========================================================
-- 2. PRODUCTS
-- =========================================================

CREATE TABLE products (
    id SERIAL PRIMARY KEY,

    category_id INTEGER REFERENCES categories(id),

    product_name VARCHAR(255) NOT NULL,

    slug VARCHAR(255) UNIQUE NOT NULL,

    short_description TEXT,

    long_description TEXT,

    thumbnail_image TEXT,

    is_featured BOOLEAN DEFAULT FALSE,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_by INTEGER REFERENCES users(id),

    updated_by INTEGER REFERENCES users(id),

    deleted_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

-- =========================================================
-- 3. TAXES
-- =========================================================

CREATE TABLE taxes (
    id SERIAL PRIMARY KEY,

    tax_name VARCHAR(100) NOT NULL,

    tax_percentage NUMERIC(5,2) NOT NULL,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_by INTEGER REFERENCES users(id),

    updated_by INTEGER REFERENCES users(id),

    deleted_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

-- =========================================================
-- 4. SIZES
-- =========================================================

CREATE TABLE sizes (
    id SERIAL PRIMARY KEY,

    size_name VARCHAR(100) NOT NULL,

    size_value VARCHAR(100) NOT NULL,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_by INTEGER REFERENCES users(id),

    updated_by INTEGER REFERENCES users(id),

    deleted_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

-- =========================================================
-- 5. PRODUCT VARIANTS
-- =========================================================

CREATE TABLE product_variants (
    id SERIAL PRIMARY KEY,

    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,

    size_id INTEGER REFERENCES sizes(id),

    tax_id INTEGER REFERENCES taxes(id),

    sku VARCHAR(100) UNIQUE,

    barcode VARCHAR(100),

    price NUMERIC(10,2) NOT NULL,

    discount_price NUMERIC(10,2),

    stock INTEGER DEFAULT 0,

    weight VARCHAR(50),

    unit VARCHAR(50),

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_by INTEGER REFERENCES users(id),

    updated_by INTEGER REFERENCES users(id),

    deleted_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

-- =========================================================
-- 6. PRODUCT IMAGES
-- =========================================================

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,

    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,

    image_path TEXT NOT NULL,

    is_primary BOOLEAN DEFAULT FALSE,

    status BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- 7. PRODUCT META
-- =========================================================

CREATE TABLE product_meta (
    id SERIAL PRIMARY KEY,

    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,

    meta_title VARCHAR(255),

    meta_keywords TEXT,

    meta_description TEXT,

    canonical_url TEXT,

    schema_json JSONB,

    og_image TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- 8. PRODUCT REVIEWS
-- =========================================================

CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,

    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,

    customer_name VARCHAR(255),

    rating INTEGER CHECK (rating >= 1 AND rating <= 5),

    review TEXT,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

-- =========================================================
-- 9. INVENTORY
-- =========================================================

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,

    product_variant_id INTEGER REFERENCES product_variants(id) ON DELETE CASCADE,

    quantity INTEGER DEFAULT 0,

    min_stock INTEGER DEFAULT 0,

    max_stock INTEGER DEFAULT 0,

    stock_status VARCHAR(50),

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- 10. COUPONS
-- =========================================================

CREATE TABLE coupons (
    id SERIAL PRIMARY KEY,

    coupon_code VARCHAR(100) UNIQUE NOT NULL,

    discount_type VARCHAR(50) NOT NULL,

    discount_value NUMERIC(10,2) NOT NULL,

    min_order_amount NUMERIC(10,2),

    start_date DATE,

    end_date DATE,

    usage_limit INTEGER,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_by INTEGER REFERENCES users(id),

    updated_by INTEGER REFERENCES users(id),

    deleted_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

-- =========================================================
-- 11. ORDERS
-- =========================================================

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,

    customer_name VARCHAR(255),

    customer_email VARCHAR(255),

    customer_mobile VARCHAR(20),

    total_amount NUMERIC(10,2) NOT NULL,

    tax_amount NUMERIC(10,2) DEFAULT 0,

    discount_amount NUMERIC(10,2) DEFAULT 0,

    shipping_charge NUMERIC(10,2) DEFAULT 0,

    grand_total NUMERIC(10,2) NOT NULL,

    payment_method VARCHAR(50),

    payment_status VARCHAR(50),

    order_status VARCHAR(50),

    transaction_id VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- 12. ORDER ITEMS
-- =========================================================

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,

    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,

    product_variant_id INTEGER REFERENCES product_variants(id),

    quantity INTEGER NOT NULL,

    price NUMERIC(10,2) NOT NULL,

    total NUMERIC(10,2) NOT NULL
);

-- =========================================================
-- 13. ATTRIBUTES
-- =========================================================

CREATE TABLE attributes (
    id SERIAL PRIMARY KEY,

    attribute_name VARCHAR(100) NOT NULL,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_by INTEGER REFERENCES users(id),

    updated_by INTEGER REFERENCES users(id),

    deleted_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

-- =========================================================
-- 14. ATTRIBUTE VALUES
-- =========================================================

CREATE TABLE attribute_values (
    id SERIAL PRIMARY KEY,

    attribute_id INTEGER REFERENCES attributes(id) ON DELETE CASCADE,

    value_name VARCHAR(100) NOT NULL,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_by INTEGER REFERENCES users(id),

    updated_by INTEGER REFERENCES users(id),

    deleted_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

-- =========================================================
-- 15. PRODUCT ATTRIBUTE MAPPING
-- =========================================================

CREATE TABLE product_attribute_mapping (
    id SERIAL PRIMARY KEY,

    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,

    attribute_value_id INTEGER REFERENCES attribute_values(id) ON DELETE CASCADE
);

-- =========================================================
-- 16. BANNERS
-- =========================================================

CREATE TABLE banners (
    id SERIAL PRIMARY KEY,

    title VARCHAR(255),

    image TEXT NOT NULL,

    redirect_url TEXT,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_by INTEGER REFERENCES users(id),

    updated_by INTEGER REFERENCES users(id),

    deleted_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

-- =========================================================
-- 17. SETTINGS
-- =========================================================

CREATE TABLE settings (
    id SERIAL PRIMARY KEY,

    setting_key VARCHAR(255) UNIQUE NOT NULL,

    setting_value TEXT,

    status BOOLEAN DEFAULT TRUE,

    created_by INTEGER REFERENCES users(id),

    updated_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);