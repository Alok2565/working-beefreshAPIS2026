import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";

import {
  FaBox,
  FaImage,
  FaInfoCircle,
  FaLayerGroup,
  FaPlus,
  FaSave,
  FaTags,
  FaTrash,
} from "react-icons/fa";

import Swal from "sweetalert2";

// MASTER SERVICES
import {
  getBrands,
  getCategories,
  getFlavors,
  getPackagings,
  getPurities,
  getTaxMasters,
  getWeightUnits,
} from "../../../../services/productMasterService";

import { createProduct } from "../../../../services/productService";
import TextEditor from "../../../../components/common/editors/TextEditor";
import usePageTitle from "../../../../hooks/usePageTitle";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  usePageTitle("Add Product");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [flavors, setFlavors] = useState<any[]>([]);
  const [purities, setPurities] = useState<any[]>([]);
  const [packagings, setPackagings] = useState<any[]>([]);
  const [weightUnits, setWeightUnits] = useState<any[]>([]);
  const [taxes, setTaxes] = useState<any[]>([]);

  const navigate = useNavigate();

  const [validated, setValidated] = useState<boolean>(false);
  // PRODUCT FORM
  const [formData, setFormData] = useState({
    category_id: "",
    product_name: "",
    slug: "",
    sku: "",
    brand_id: "",

    short_description: "",
    long_description: "",

    flavor_id: "",
    purity_id: "",
    packaging_id: "",

    seo_title: "",
    seo_keywords: "",
    seo_description: "",

    thumbnail_image: null as File | null,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,

    status: true,
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  };
  // VARIANTS
  const [variants, setVariants] = useState([
    {
      variant_name: "",
      sku: "",
      barcode: "",
      weight: "",
      weight_unit_id: "",
      tax_id: "",
      price: "",
      discount_price: "",
      low_stock_alert: "",
    },
  ]);

  // LOAD MASTER DATA
  useEffect(() => {
    loadMasters();
  }, []);

  const loadMasters = async () => {
    try {
      setLoading(true);

      const [
        categoryRes,
        brandRes,
        flavorRes,
        purityRes,
        packagingRes,
        weightRes,
        taxRes,
      ] = await Promise.all([
        getCategories(),
        getBrands(),
        getFlavors(),
        getPurities(),
        getPackagings(),
        getWeightUnits(),
        getTaxMasters(),
      ]);

      setCategories(categoryRes?.data?.data || []);
      setBrands(brandRes?.data?.data || []);
      setFlavors(flavorRes?.data?.data || []);
      setPurities(purityRes?.data?.data || []);
      setPackagings(packagingRes?.data?.data || []);
      setWeightUnits(weightRes?.data?.data || []);
      setTaxes(taxRes?.data?.data || []);
    } catch (error) {
      console.log("MASTER ERROR =>", error);
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // HANDLE VARIANT CHANGE
  const handleVariantChange = (index: number, field: string, value: string) => {
    const numericFields = [
      "weight",
      "price",
      "discount_price",
      "low_stock_alert",
    ];

    const updatedVariants: any = [...variants];

    updatedVariants[index][field] = numericFields.includes(field)
      ? value === ""
        ? null
        : Number(value)
      : value;

    setVariants(updatedVariants);
  };

  //
  // ======================================================
  // ADD VARIANT
  // ======================================================
  //

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        variant_name: "",

        sku: "",

        barcode: "",

        weight: "",

        weight_unit_id: "",

        tax_id: "",

        price: "",

        discount_price: "",

        low_stock_alert: "",
      },
    ]);
  };

  //
  // ======================================================
  // REMOVE VARIANT
  // ======================================================
  //

  const removeVariant = (index: number) => {
    const updated = [...variants];

    updated.splice(index, 1);

    setVariants(updated);
  };
  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    try {
      setLoading(true);
      const payload = {
        ...formData,
        gallery_images: galleryImages,
        variants,
      };

      //console.log("PAYLOAD =>", payload);

      const response = await createProduct(payload);

      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product Created Successfully",
        });

        // RESET FORM
        setFormData({
          category_id: "",
          product_name: "",
          slug: "",
          sku: "",
          brand_id: "",

          short_description: "",
          long_description: "",

          flavor_id: "",
          purity_id: "",
          packaging_id: "",

          seo_title: "",
          seo_keywords: "",
          seo_description: "",

          thumbnail_image: null,

          is_featured: false,
          is_best_seller: false,
          is_new_arrival: false,

          status: true,
        });

        setVariants([
          {
            variant_name: "",
            sku: "",
            barcode: "",
            weight: "",
            weight_unit_id: "",
            tax_id: "",
            price: "",
            discount_price: "",
            low_stock_alert: "",
          },
        ]);
      }
      navigate("/admin/manage/products/?success=Product Created successfully");
    } catch (error: any) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // IMAGE STATES
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

  // THUMBNAIL IMAGE CHANGE
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail_image: file,
      }));

      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // GALLERY IMAGE CHANGE
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryImages(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setGalleryPreview(previewUrls);
  };

  return (
    <Container fluid>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Card
          className="border-0 shadow-sm rounded-4 mb-4 sticky-top bg-white"
          style={{
            top: "20px",
            zIndex: 1020,
          }}
        >
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="fw-bold mb-1">Add Product</h3>

              <p className="text-muted mb-0">
                Create Bee Fresh ecommerce products
              </p>
            </div>

            <Button
              type="submit"
              variant="warning"
              className="fw-semibold px-4"
            >
              <FaSave className="me-2" />
              Save Product
            </Button>
          </Card.Body>
        </Card>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Accordion defaultActiveKey="0" alwaysOpen>
            {/* PRODUCT INFO */}

            <Accordion.Item
              eventKey="0"
              className="mb-4 border-0 shadow-sm rounded-4 overflow-hidden"
            >
              <Accordion.Header>
                <FaInfoCircle className="me-2 text-primary" />
                Product Information
              </Accordion.Header>

              <Accordion.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name</Form.Label>

                      <Form.Control
                        type="text"
                        required
                        name="product_name"
                        placeholder="Enter product name"
                        value={formData.product_name}
                        onChange={(e) => {
                          const productName = e.target.value;

                          setFormData({
                            ...formData,
                            product_name: productName,
                            slug: generateSlug(productName),
                          });
                        }}
                      />

                      <Form.Control.Feedback type="invalid">
                        Product name is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group className="mb-3">
                      <Form.Label>Slug</Form.Label>

                      <Form.Control
                        required
                        type="text"
                        name="slug"
                        placeholder="product-slug"
                        value={formData.slug}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Label>Category</Form.Label>

                    <Form.Select
                      required
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>

                      {categories.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.category_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Label>Brand</Form.Label>

                    <Form.Select
                      required
                      name="brand_id"
                      value={formData.brand_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Brand</option>

                      {brands.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.brand_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Label>Main SKU</Form.Label>

                    <Form.Control
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <TextEditor
                        label="Short Description"
                        value={formData.short_description}
                        onChange={(data: any) =>
                          setFormData({
                            ...formData,
                            short_description: data,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <TextEditor
                        label="Full Description"
                        value={formData.long_description}
                        onChange={(data: any) =>
                          setFormData({
                            ...formData,
                            long_description: data,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            {/* ATTRIBUTES */}

            <Accordion.Item
              eventKey="1"
              className="mb-4 border-0 shadow-sm rounded-4 overflow-hidden"
            >
              <Accordion.Header>
                <FaTags className="me-2 text-success" />
                Product Attributes
              </Accordion.Header>

              <Accordion.Body>
                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Label>Flavor</Form.Label>

                    <Form.Select
                      name="flavor_id"
                      value={formData.flavor_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Flavor</option>

                      {flavors.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.flavor_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Label>Purity</Form.Label>

                    <Form.Select
                      name="purity_id"
                      value={formData.purity_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Purity</option>

                      {purities.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.purity_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Label>Packaging</Form.Label>

                    <Form.Select
                      name="packaging_id"
                      value={formData.packaging_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Packaging</option>

                      {packagings.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.packaging_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            {/* VARIANTS

            <Accordion.Item
              eventKey="2"
              className="mb-4 border-0 shadow-sm rounded-4 overflow-hidden"
            >
              <Accordion.Header>
                <FaLayerGroup className="me-2 text-danger" />
                Product Variants
              </Accordion.Header>

              <Accordion.Body>
                <div className="table-responsive">
                  <Table bordered hover>
                    <thead className="table-light">
                      <tr>
                        <th>Variant</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>SKU</th>
                        <th>Barcode</th>
                        <th>Price</th>
                        <th>Offer</th>
                        <th>Tax</th>
                        <th>Stock Alert</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {variants.map((variant, index) => (
                        <tr key={index}>
                          <td>
                            <Form.Control
                              value={variant.variant_name}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "variant_name",
                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          <td>
                            <Form.Control
                              value={variant.weight}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "weight",
                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          <td>
                            <Form.Select
                              value={variant.weight_unit_id}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "weight_unit_id",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="">Select</option>

                              {weightUnits.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.unit_name}
                                </option>
                              ))}
                            </Form.Select>
                          </td>

                          <td>
                            <Form.Control
                              value={variant.sku}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "sku",
                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          <td>
                            <Form.Control
                              value={variant.barcode}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "barcode",
                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          <td>
                            <Form.Control
                              type="number"
                              value={variant.price}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "price",
                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          <td>
                            <Form.Control
                              type="number"
                              value={variant.discount_price}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "discount_price",
                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          <td>
                            <Form.Select
                              value={variant.tax_id}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "tax_id",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="">Select Tax</option>

                              {taxes.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.tax_name}
                                </option>
                              ))}
                            </Form.Select>
                          </td>

                          <td>
                            <Form.Control
                              type="number"
                              value={variant.low_stock_alert}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "low_stock_alert",
                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removeVariant(index)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <Button variant="dark" onClick={addVariant}>
                  <FaPlus className="me-2" />
                  Add Variant
                </Button>
              </Accordion.Body>
            </Accordion.Item> */}
            {/* VARIANTS */}

            <Accordion.Item
              eventKey="2"
              className="mb-4 border-0 shadow-sm rounded-4 overflow-hidden"
            >
              <Accordion.Header>
                <FaLayerGroup className="me-2 text-danger" />
                Product Variants
              </Accordion.Header>

              <Accordion.Body>
                {variants.map((variant, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-sm rounded-4 mb-4"
                  >
                    <Card.Body>
                      {/* HEADER */}

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h5 className="fw-bold mb-1">Variant #{index + 1}</h5>

                          <p className="text-muted small mb-0">
                            Manage product variant details
                          </p>
                        </div>

                        {/* SHOW DELETE ONLY IF MORE THAN 1 VARIANT */}

                        {variants.length > 1 && (
                          <Button
                            variant="danger"
                            size="sm"
                            className="rounded-3"
                            onClick={() => removeVariant(index)}
                          >
                            <FaTrash className="p-0" />
                          </Button>
                        )}
                      </div>

                      <Row>
                        {/* ROW 1 */}

                        <Col md={3} className="mb-3">
                          <Form.Group>
                            <Form.Label>Variant Name</Form.Label>

                            <Form.Control
                              type="text"
                              placeholder="Ex: 250gm Pack"
                              value={variant.variant_name}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "variant_name",
                                  e.target.value,
                                )
                              }
                            />
                          </Form.Group>
                        </Col>

                        <Col md={2} className="mb-3">
                          <Form.Group>
                            <Form.Label>Weight</Form.Label>

                            <Form.Control
                              type="text"
                              placeholder="250"
                              value={variant.weight}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "weight",
                                  e.target.value,
                                )
                              }
                            />
                          </Form.Group>
                        </Col>

                        <Col md={2} className="mb-3">
                          <Form.Group>
                            <Form.Label>Unit</Form.Label>

                            <Form.Select
                              value={variant.weight_unit_id}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "weight_unit_id",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="">Select Unit</option>

                              {weightUnits.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.unit_name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col md={2} className="mb-3">
                          <Form.Group>
                            <Form.Label>SKU</Form.Label>

                            <Form.Control
                              type="text"
                              placeholder="SKU"
                              value={variant.sku}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "sku",
                                  e.target.value,
                                )
                              }
                            />
                          </Form.Group>
                        </Col>

                        <Col md={3} className="mb-3">
                          <Form.Group>
                            <Form.Label>Barcode</Form.Label>

                            <Form.Control
                              type="text"
                              placeholder="Barcode"
                              value={variant.barcode}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "barcode",
                                  e.target.value,
                                )
                              }
                            />
                          </Form.Group>
                        </Col>

                        {/* ROW 2 */}

                        <Col md={3} className="mb-3">
                          <Form.Group>
                            <Form.Label>Price</Form.Label>

                            <Form.Control
                              type="number"
                              placeholder="0.00"
                              value={variant.price}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "price",
                                  e.target.value,
                                )
                              }
                            />
                          </Form.Group>
                        </Col>

                        <Col md={3} className="mb-3">
                          <Form.Group>
                            <Form.Label>Offer Price</Form.Label>

                            <Form.Control
                              type="number"
                              placeholder="0.00"
                              value={variant.discount_price}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "discount_price",
                                  e.target.value,
                                )
                              }
                            />
                          </Form.Group>
                        </Col>

                        <Col md={3} className="mb-3">
                          <Form.Group>
                            <Form.Label>Tax</Form.Label>

                            <Form.Select
                              value={variant.tax_id}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "tax_id",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="">Select Tax</option>

                              {taxes.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.tax_name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col md={3} className="mb-3">
                          <Form.Group>
                            <Form.Label>Low Stock Alert</Form.Label>

                            <Form.Control
                              type="number"
                              placeholder="10"
                              value={variant.low_stock_alert}
                              onChange={(e) =>
                                handleVariantChange(
                                  index,
                                  "low_stock_alert",
                                  e.target.value,
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}

                {/* ADD VARIANT BUTTON */}

                <div className="text-center">
                  <Button
                    variant="dark"
                    className="rounded-3 px-4 py-2"
                    onClick={addVariant}
                  >
                    <FaPlus className="me-2" />
                    Add New Variant
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* IMAGES */}

            <Accordion.Item
              eventKey="3"
              className="mb-4 border-0 shadow-sm rounded-4 overflow-hidden"
            >
              <Accordion.Header>
                <FaImage className="me-2 text-danger" />
                Product Images
              </Accordion.Header>

              <Accordion.Body>
                <Row>
                  {/* THUMBNAIL IMAGE */}

                  <Col md={6} className="mb-4">
                    <Form.Label className="fw-semibold">
                      Thumbnail Image
                    </Form.Label>

                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                    />

                    {/* PREVIEW */}

                    {thumbnailPreview && (
                      <div className="mt-3">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail"
                          className="img-fluid rounded-4 border shadow-sm"
                          style={{
                            width: "220px",
                            height: "220px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </Col>

                  {/* GALLERY IMAGES */}

                  <Col md={6} className="mb-4">
                    <Form.Label className="fw-semibold">
                      Gallery Images
                    </Form.Label>

                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleGalleryChange}
                    />

                    {/* GALLERY PREVIEW */}

                    {galleryPreview.length > 0 && (
                      <Row className="mt-3 g-3">
                        {galleryPreview.map((image, index) => (
                          <Col xs={6} md={4} key={index}>
                            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                              <img
                                src={image}
                                alt={`Gallery ${index}`}
                                className="img-fluid"
                                style={{
                                  height: "140px",
                                  objectFit: "cover",
                                }}
                              />
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            {/* SEO */}

            <Accordion.Item
              eventKey="4"
              className="mb-4 border-0 shadow-sm rounded-4 overflow-hidden"
            >
              <Accordion.Header>
                <FaBox className="me-2 text-secondary" />
                SEO Information
              </Accordion.Header>

              <Accordion.Body>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Label>SEO Title</Form.Label>

                    <Form.Control
                      type="text"
                      name="seo_title"
                      value={formData.seo_title}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Label>SEO Keywords</Form.Label>

                    <Form.Control
                      type="text"
                      name="seo_keywords"
                      value={formData.seo_keywords}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={12}>
                    <Form.Label>SEO Description</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="seo_description"
                      value={formData.seo_description}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </Form>
    </Container>
  );
}

export default AddProduct;
