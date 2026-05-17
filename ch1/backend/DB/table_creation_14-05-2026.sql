```sql
-- =========================================================
-- BEE HONEY ECOMMERCE DATABASE
-- FINAL ENTERPRISE DATABASE STRUCTURE
-- PostgreSQL Production Ready
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



-- =========================================================
-- COMMON UPDATE TRIGGER FUNCTION
-- =========================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';



-- =========================================================
-- 1. USERS
-- =========================================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    uuid UUID DEFAULT uuid_generate_v4(),

    full_name VARCHAR(255) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    mobile_number VARCHAR(20),

    password TEXT NOT NULL,

    role VARCHAR(100),

    profile_image TEXT,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);



-- =========================================================
-- 2. All Attributes
-- =========================================================

CREATE TABLE IF NOT EXISTS weight_units (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    unit_name VARCHAR(100) NOT NULL,
    short_name VARCHAR(20) UNIQUE NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP NULL
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
);

CREATE TABLE IF NOT EXISTS flavors (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    flavor_name VARCHAR(100) NOT NULL,
    flavor_slug VARCHAR(20) UNIQUE NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP NULL,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  
);

CREATE TABLE IF NOT EXISTS packaging_types (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    packaging_name VARCHAR(100) NOT NULL,
    packaging_slug VARCHAR(100) UNIQUE NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    created_by INTEGER NULL REFERENCES users(id),
    updated_by INTEGER NULL REFERENCES users(id),
    deleted_by INTEGER NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Purities (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
	purity_name VARCHAR(100) NOT NULL,
    purity_slug VARCHAR(20) UNIQUE NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP NULL,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  
);  



-- =========================================================
-- 3. CATEGORIES
-- =========================================================

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,

    uuid UUID DEFAULT uuid_generate_v4(),

    parent_id INTEGER,

    category_name VARCHAR(255) NOT NULL,

    category_slug VARCHAR(255) UNIQUE NOT NULL,

    description TEXT,

    sort_order INTEGER DEFAULT 0,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    CONSTRAINT fk_parent_category
    FOREIGN KEY(parent_id)
    REFERENCES categories(id)
    ON DELETE CASCADE
);



-- =========================================================
-- 4. CATEGORY IMAGES
-- =========================================================

CREATE TABLE IF NOT EXISTS category_images (
    id SERIAL PRIMARY KEY,

    category_id INTEGER NOT NULL
    REFERENCES categories(id)
    ON DELETE CASCADE,

    image_path TEXT NOT NULL,

    is_primary BOOLEAN DEFAULT FALSE,

    sort_order INTEGER DEFAULT 0,

    status BOOLEAN DEFAULT TRUE,

    is_deleted BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);



-- =========================================================
-- 5. TAXES
-- =========================================================

CREATE TABLE IF NOT EXISTS taxes (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    tax_name VARCHAR(100) NOT NULL,
    tax_percentage NUMERIC(5,2)
    CHECK(tax_percentage >= 0),
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
   deleted_at TIMESTAMP NULL
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   
);



-- =========================================================
-- 6. ATTRIBUTES
-- =========================================================

CREATE TABLE IF NOT EXISTS product_attributes (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    attribute_name VARCHAR(100) UNIQUE NOT NULL,
    attribute_slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);




-- =========================================================
-- 7. ATTRIBUTE VALUES
-- =========================================================
CREATE TABLE IF NOT EXISTS attribute_values (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    attribute_id INTEGER NOT NULL
    REFERENCES product_attributes(id)
    ON DELETE CASCADE,
    value_name VARCHAR(100) NOT NULL,
    value_slug VARCHAR(100),
    value_code VARCHAR(50),
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 8. PRODUCTS
-- =========================================================

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    category_id INTEGER
    REFERENCES categories(id)
    ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    sku VARCHAR(150) UNIQUE,
    brand_name VARCHAR(150),
    short_description TEXT,
    long_description TEXT,
    thumbnail_image TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_best_seller BOOLEAN DEFAULT FALSE,
    is_new_arrival BOOLEAN DEFAULT FALSE,
    seo_title VARCHAR(255),
    seo_keywords TEXT,
    seo_description TEXT,
    sort_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP NULL,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
);



-- =========================================================
-- 9. PRODUCT VARIANTS
-- =========================================================

CREATE TABLE IF NOT EXISTS product_variants (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    product_id INTEGER NOT NULL
    REFERENCES products(id)
    ON DELETE CASCADE,
    tax_id INTEGER
    REFERENCES taxes(id)
    ON DELETE SET NULL,
    weight_unit_id INTEGER
    REFERENCES weight_units(id)
    ON DELETE SET NULL,
    variant_name VARCHAR(255),
    sku VARCHAR(100) UNIQUE NOT NULL,
    barcode VARCHAR(100),
    weight NUMERIC(10,2),
    price NUMERIC(10,2)
    CHECK(price >= 0),
    discount_price NUMERIC(10,2)
    CHECK(discount_price >= 0),
    low_stock_alert INTEGER DEFAULT 5,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP NULL,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
);



-- =========================================================
-- 10. PRODUCT ATTRIBUTE MAPPING
-- =========================================================

CREATE TABLE IF NOT EXISTS product_attribute_mapping (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL
    REFERENCES products(id)
    ON DELETE CASCADE,
    attribute_id INTEGER NOT NULL
    REFERENCES product_attributes(id)
    ON DELETE CASCADE,
    attribute_value_id INTEGER NOT NULL
    REFERENCES attribute_values(id)
    ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, attribute_id, attribute_value_id)
);



-- =========================================================
-- 11. PRODUCT IMAGES
-- =========================================================
CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL
    REFERENCES products(id)
    ON DELETE CASCADE,
    variant_id INTEGER
    REFERENCES product_variants(id)
    ON DELETE CASCADE,
    image_path TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 12. PRODUCT META
-- =========================================================

CREATE TABLE IF NOT EXISTS product_meta (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL
    REFERENCES products(id)
    ON DELETE CASCADE,
    meta_title VARCHAR(255),
    meta_keywords TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    schema_json JSONB,
    og_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 13. CUSTOMERS
-- =========================================================

CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    user_id INTEGER
    REFERENCES users(id),
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    mobile_number VARCHAR(20),
    wallet_balance NUMERIC(10,2) DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    total_spent NUMERIC(10,2) DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 14. CUSTOMER ADDRESSES
-- =========================================================

CREATE TABLE IF NOT EXISTS customer_addresses (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL
    REFERENCES customers(id)
    ON DELETE CASCADE,
    address_type VARCHAR(50),
    full_name VARCHAR(255),
    mobile_number VARCHAR(20),
    address_line_1 TEXT,
    address_line_2 TEXT,
    landmark VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 15. PRODUCT REVIEWS
-- =========================================================

CREATE TABLE IF NOT EXISTS product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL
    REFERENCES products(id)
    ON DELETE CASCADE,
    customer_id INTEGER
    REFERENCES customers(id),
    rating INTEGER
    CHECK(rating >= 1 AND rating <= 5),
    review TEXT,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
   deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 16. WAREHOUSES
-- =========================================================

CREATE TABLE IF NOT EXISTS warehouses (
    id SERIAL PRIMARY KEY,
    warehouse_name VARCHAR(255) NOT NULL,
    warehouse_code VARCHAR(100) UNIQUE NOT NULL,
    contact_person VARCHAR(255),
    mobile_number VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(20),
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 17. WAREHOUSE STOCK
-- =========================================================

CREATE TABLE IF NOT EXISTS warehouse_stock (
    id SERIAL PRIMARY KEY,
    warehouse_id INTEGER NOT NULL
    REFERENCES warehouses(id)
    ON DELETE CASCADE,
    product_variant_id INTEGER NOT NULL
    REFERENCES product_variants(id)
    ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0
    CHECK(quantity >= 0),
    reserved_quantity INTEGER DEFAULT 0,
    available_quantity INTEGER DEFAULT 0,
    rack_location VARCHAR(255),
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 18. STOCK MOVEMENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS stock_movements (
    id SERIAL PRIMARY KEY,
    product_variant_id INTEGER NOT NULL
    REFERENCES product_variants(id)
    ON DELETE CASCADE,
    warehouse_id INTEGER
    REFERENCES warehouses(id)
    ON DELETE SET NULL,
    movement_type VARCHAR(50),
    quantity INTEGER NOT NULL,
    previous_stock INTEGER,
    current_stock INTEGER,
    remarks TEXT,
    reference_number VARCHAR(150),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 19. BATCH TRACKING
-- =========================================================

CREATE TABLE IF NOT EXISTS batch_tracking (
    id SERIAL PRIMARY KEY,
    batch_number VARCHAR(150) UNIQUE NOT NULL,
    product_variant_id INTEGER NOT NULL
    REFERENCES product_variants(id)
    ON DELETE CASCADE,
    warehouse_id INTEGER
    REFERENCES warehouses(id),
    manufacturing_date DATE,
    expiry_date DATE,
    quantity INTEGER DEFAULT 0,
    damaged_quantity INTEGER DEFAULT 0,
    status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 20. CARTS
-- =========================================================

CREATE TABLE IF NOT EXISTS carts (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL
    REFERENCES customers(id)
    ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 21. CART ITEMS
-- =========================================================

CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL
    REFERENCES carts(id)
    ON DELETE CASCADE,
    product_variant_id INTEGER NOT NULL
    REFERENCES product_variants(id)
    ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1
    CHECK(quantity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 22. WISHLISTS
-- =========================================================

CREATE TABLE IF NOT EXISTS wishlists (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL
    REFERENCES customers(id)
    ON DELETE CASCADE,
    product_id INTEGER NOT NULL
    REFERENCES products(id)
    ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 23. COUPONS
-- =========================================================

CREATE TABLE IF NOT EXISTS coupons (
    id SERIAL PRIMARY KEY,
    coupon_code VARCHAR(100) UNIQUE NOT NULL,
    discount_type VARCHAR(50),
    discount_value NUMERIC(10,2),
    min_order_amount NUMERIC(10,2),
    start_date DATE,
    end_date DATE,
    usage_limit INTEGER DEFAULT 1,
    used_count INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP NULL,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 24. ORDERS
-- =========================================================

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    order_number UUID DEFAULT uuid_generate_v4(),
    customer_id INTEGER
    REFERENCES customers(id),
    address_id INTEGER
    REFERENCES customer_addresses(id),
    total_amount NUMERIC(10,2),
    tax_amount NUMERIC(10,2) DEFAULT 0,
    discount_amount NUMERIC(10,2) DEFAULT 0,
    shipping_charge NUMERIC(10,2) DEFAULT 0,
    grand_total NUMERIC(10,2),
    payment_method VARCHAR(50),
    payment_status VARCHAR(50)
    DEFAULT 'PENDING',
    order_status VARCHAR(50)
    DEFAULT 'NEW'
    CHECK(order_status IN (
        'NEW',
        'PROCESSING',
        'PACKED',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
        'RETURNED'
    )),
    transaction_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 25. ORDER ITEMS
-- =========================================================

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL
    REFERENCES orders(id)
    ON DELETE CASCADE,
    product_variant_id INTEGER
    REFERENCES product_variants(id),
    quantity INTEGER NOT NULL
    CHECK(quantity > 0),
    price NUMERIC(10,2),
    total NUMERIC(10,2),
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
);



-- =========================================================
-- 26. ORDER STATUS HISTORY
-- =========================================================

CREATE TABLE IF NOT EXISTS order_status_history (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL
    REFERENCES orders(id)
    ON DELETE CASCADE,
    old_status VARCHAR(100),
    new_status VARCHAR(100),
    remarks TEXT,
    changed_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 27. INVOICES
-- =========================================================

CREATE TABLE IF NOT EXISTS invoices (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL
    REFERENCES orders(id)
    ON DELETE CASCADE,
    invoice_number VARCHAR(150) UNIQUE NOT NULL,
    invoice_date DATE DEFAULT CURRENT_DATE,
    gst_number VARCHAR(100),
    cgst NUMERIC(10,2),
    sgst NUMERIC(10,2),
    igst NUMERIC(10,2),
    subtotal NUMERIC(10,2),
    tax_amount NUMERIC(10,2),
    discount_amount NUMERIC(10,2),
    grand_total NUMERIC(10,2),
    invoice_status VARCHAR(50),
    pdf_file TEXT,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
	deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 28. DELIVERY PARTNERS
-- =========================================================

CREATE TABLE IF NOT EXISTS delivery_partners (
    id SERIAL PRIMARY KEY,
    partner_name VARCHAR(255),
    contact_person VARCHAR(255),
    mobile_number VARCHAR(20),
    email VARCHAR(255),
    tracking_url TEXT,
    api_key TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 29. SHIPMENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS shipments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL
    REFERENCES orders(id)
    ON DELETE CASCADE,
    invoice_id INTEGER
    REFERENCES invoices(id),
    delivery_partner_id INTEGER
    REFERENCES delivery_partners(id),
    tracking_number VARCHAR(255),
    shipment_status VARCHAR(100),
    shipped_date TIMESTAMP,
    delivered_date TIMESTAMP,
    shipping_label TEXT,
    remarks TEXT,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 30. TRANSACTIONS
-- =========================================================

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    transaction_number VARCHAR(150) UNIQUE,
    payment_gateway VARCHAR(100),
    payment_method VARCHAR(100),
    transaction_status VARCHAR(50),
    amount NUMERIC(10,2),
    gateway_response JSONB,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 31. REFUNDS
-- =========================================================
CREATE TABLE IF NOT EXISTS refunds (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    transaction_id INTEGER REFERENCES transactions(id),
    refund_amount NUMERIC(10,2),
    refund_reason TEXT,
    refund_status VARCHAR(50),
    refunded_at TIMESTAMP
);



-- =========================================================
-- 32. BANNERS
-- =========================================================

CREATE TABLE IF NOT EXISTS banners (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    image TEXT NOT NULL,
    redirect_url TEXT,
    banner_position VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    status BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    deleted_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 33. SETTINGS
-- =========================================================

CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_group VARCHAR(100),
    status BOOLEAN DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- 34. ACTIVITY LOGS
-- =========================================================

CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    module_name VARCHAR(255),
    action_type VARCHAR(100),
    description TEXT,
    ip_address VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_products_slug
ON products(slug);

CREATE INDEX idx_categories_slug
ON categories(category_slug);

CREATE INDEX idx_variants_sku
ON product_variants(sku);

CREATE INDEX idx_orders_customer
ON orders(customer_id);

CREATE INDEX idx_order_items_order
ON order_items(order_id);

CREATE INDEX idx_product_images_product
ON product_images(product_id);

CREATE INDEX idx_reviews_product
ON product_reviews(product_id);

CREATE INDEX idx_warehouse_stock_variant
ON warehouse_stock(product_variant_id);

CREATE INDEX idx_batch_tracking_variant
ON batch_tracking(product_variant_id);

CREATE INDEX idx_transactions_order
ON transactions(order_id);


CREATE INDEX IF NOT EXISTS idx_product_attributes_status
ON product_attributes(status);

-- FIXED: Target table name changed from product_attribute_values to attribute_values
CREATE INDEX IF NOT EXISTS idx_attribute_values_attribute_id
ON attribute_values(attribute_id);

CREATE INDEX IF NOT EXISTS idx_product_attribute_mapping_product_id
ON product_attribute_mapping(product_id);



-- =========================================================
-- UPDATED_AT TRIGGERS
-- =========================================================

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_variants_updated_at
BEFORE UPDATE ON product_variants
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();



-- =========================================================
-- END DATABASE
-- =========================================================
https://chatgpt.com/c/6a0436fa-4de0-8324-b68c-43581d0f22a5:-Chat GPT

https://coreui.io/react/docs/forms/range-slider/