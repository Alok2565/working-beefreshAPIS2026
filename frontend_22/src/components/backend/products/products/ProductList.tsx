// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Card,
//   Table,
//   Form,
//   InputGroup,
//   Button,
//   Badge,
//   Pagination,
//   Dropdown,
//   Image,
// } from "react-bootstrap";

// import {
//   Search,
//   ChevronUp,
//   ChevronDown,
//   Pencil,
//   Trash2,
//   Plus,
//   Download,
//   Filter,
// } from "lucide-react";
// import { FaImage, FaPlus, FaRupeeSign } from "react-icons/fa";
// import noImage from "../../../../assets/images/prod_images.png";
// import { Link } from "react-router-dom";
// import { getProducts } from "../../../../services/productService";
// import { MdCurrencyRupee } from "react-icons/md";
// import Swal from "sweetalert2";

// interface Product {
//   id: number;
//   image: string;
//   product: string;
//   sku: string;
//   stock: string;
//   price: number;
//   category: string;
//   tags: string;
//   brand: string;
//   date: string;
// }

// type SortField =
//   | "product"
//   | "sku"
//   | "stock"
//   | "price"
//   | "category"
//   | "tags"
//   | "brand"
//   | "date";

// function ProductList() {
//   const [search, setSearch] = useState<string>("");
//   const [sortField, setSortField] = useState<SortField>("product");

//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [prducts_data, setProductsData] = useState<Product[]>([]);

//   const [loading, setLoading] = useState<boolean>(false);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await getProducts();
//       setProductsData(response?.data?.data || []);
//       console.warn(response);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to fetch products",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const products: Product[] = [
//     {
//       id: 1,
//       image: noImage,
//       product: "iPhone 15 Pro",
//       sku: "APL-IP15P",
//       stock: "In Stock",
//       price: 1299,
//       category: "Mobile",
//       tags: "Apple, Premium",
//       brand: "Apple",
//       date: "12 May 2026",
//     },
//     {
//       id: 2,
//       image: noImage,
//       product: "Samsung Galaxy S25",
//       sku: "SMS-S25",
//       stock: "Out of Stock",
//       price: 999,
//       category: "Mobile",
//       tags: "Android",
//       brand: "Samsung",
//       date: "10 May 2026",
//     },
//     {
//       id: 3,
//       image: noImage,
//       product: "Sony Headphones",
//       sku: "SNY-HDP",
//       stock: "Low Stock",
//       price: 199,
//       category: "Accessories",
//       tags: "Audio",
//       brand: "Sony",
//       date: "08 May 2026",
//     },
//     {
//       id: 4,
//       image: noImage,
//       product: "MacBook Pro M4",
//       sku: "APL-MBP-M4",
//       stock: "In Stock",
//       price: 2499,
//       category: "Laptop",
//       tags: "Apple, Laptop",
//       brand: "Apple",
//       date: "05 May 2026",
//     },
//   ];

//   const handleSort = (field: SortField) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortOrder("asc");
//     }
//   };

//   const filteredProducts = useMemo(() => {
//     return [...products]
//       .filter((item) =>
//         Object.values(item).some((value) =>
//           value.toString().toLowerCase().includes(search.toLowerCase()),
//         ),
//       )
//       .sort((a, b) => {
//         const valueA = a[sortField].toString().toLowerCase();

//         const valueB = b[sortField].toString().toLowerCase();

//         if (sortOrder === "asc") {
//           return valueA > valueB ? 1 : -1;
//         }

//         return valueA < valueB ? 1 : -1;
//       });
//   }, [search, sortField, sortOrder]);

//   const renderSortIcon = (field: SortField) => {
//     if (sortField !== field) return null;

//     return sortOrder === "asc" ? (
//       <ChevronUp size={16} className="ms-1" />
//     ) : (
//       <ChevronDown size={16} className="ms-1" />
//     );
//   };

//   const getStockBadge = (stock: string) => {
//     switch (stock) {
//       case "In Stock":
//         return <Badge bg="success">{stock}</Badge>;

//       case "Low Stock":
//         return <Badge bg="warning">{stock}</Badge>;

//       case "Out of Stock":
//         return <Badge bg="danger">{stock}</Badge>;

//       default:
//         return <Badge bg="secondary">{stock}</Badge>;
//     }
//   };

//   const tableHeaders: SortField[] = [
//     "product",
//     "sku",
//     "stock",
//     "price",
//     "category",
//     "tags",
//     "brand",
//     "date",
//   ];

//   return (
//     <div className="container-fluid py-4 bg-light min-vh-100">
//       <Card className="border-0 shadow-sm rounded-2">
//         {/* Header */}
//         <Card.Header className="bg-white border-0 p-4">
//           <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
//             <div>
//               <h2 className="fw-bold mb-1 text-dark">Product Management</h2>

//               <p className="text-muted mb-0">
//                 Manage and monitor all product inventory
//               </p>
//             </div>

//             <div className="d-flex flex-wrap gap-2">
//               {/* Search */}
//               <InputGroup style={{ width: "280px" }}>
//                 <InputGroup.Text className="bg-white border-end-0">
//                   <Search size={18} />
//                 </InputGroup.Text>

//                 <Form.Control
//                   type="text"
//                   placeholder="Search products..."
//                   className="border-start-0"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </InputGroup>

//               {/* Filter */}
//               <Dropdown>
//                 <Dropdown.Toggle
//                   variant="outline-secondary"
//                   className="d-flex align-items-center gap-2"
//                 >
//                   <Filter size={16} />
//                   Filter
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu>
//                   <Dropdown.Item>All Products</Dropdown.Item>

//                   <Dropdown.Item>In Stock</Dropdown.Item>

//                   <Dropdown.Item>Low Stock</Dropdown.Item>

//                   <Dropdown.Item>Out of Stock</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>

//               {/* Export */}
//               <Button
//                 variant="outline-primary"
//                 className="d-flex align-items-center gap-2"
//               >
//                 <Download size={16} />
//                 Export
//               </Button>

//               {/* Add Product */}
//               <Link to="/admin/manage/product/add-new">
//                 <Button
//                   style={{
//                     backgroundColor: "#14468C",
//                     border: "none",
//                     fontWeight: 600,
//                   }}
//                 >
//                   <FaPlus className="me-2" />
//                   Add Product
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </Card.Header>

//         {/* Table */}
//         <Card.Body className="p-0">
//           <div className="table-responsive">
//             <Table hover className="align-middle mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th className="ps-4">
//                     <Form.Check />
//                   </th>

//                   <th className="text-uppercase small fw-semibold text-muted">
//                     <FaImage />
//                   </th>

//                   {tableHeaders.map((field) => (
//                     <th
//                       key={field}
//                       onClick={() => handleSort(field)}
//                       style={{
//                         cursor: "pointer",
//                         whiteSpace: "nowrap",
//                       }}
//                       className="small fw-bold text-dark"
//                     >
//                       <div className="d-flex align-items-center">
//                         {field}
//                         {renderSortIcon(field)}
//                       </div>
//                     </th>
//                   ))}

//                   <th className="small fw-bold text-dark">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map((item) => (
//                     <tr key={item.id}>
//                       <td className="ps-4">
//                         <Form.Check />
//                       </td>

//                       {/* Product Image */}
//                       <td>
//                         <Image
//                           src={item.image}
//                           alt={item.product}
//                           rounded
//                           fluid
//                           style={{
//                             width: "40px",
//                             height: "40px",
//                             objectFit: "cover",
//                             border: "1px solid #e9ecef",
//                             maxWidth: "40px",
//                             maxHeight: "40px",
//                           }}
//                         />
//                       </td>

//                       {/* Product */}
//                       <td>
//                         <small className="text-muted">{item.product}</small>

//                         <small className="text-muted">
//                           Product ID: #{item.id}
//                         </small>
//                       </td>

//                       {/* SKU */}
//                       <td>{item.sku}</td>

//                       {/* Stock */}
//                       <td>{getStockBadge(item.stock)}</td>

//                       {/* Price */}
//                       <td className="text-muted">
//                         <MdCurrencyRupee />
//                         {item.price.toLocaleString()}
//                       </td>

//                       {/* Category */}
//                       <td>{item.category}</td>

//                       {/* Tags */}
//                       <td>{item.tags}</td>

//                       {/* Brand */}
//                       <td>{item.brand}</td>

//                       {/* Date */}
//                       <td>{item.date}</td>

//                       {/* Actions */}
//                       <td>
//                         <div className="d-flex gap-2">
//                           <Button size="sm" variant="outline-primary">
//                             <Pencil size={16} />
//                           </Button>

//                           <Button size="sm" variant="outline-danger">
//                             <Trash2 size={16} />
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={11} className="text-center py-5 text-muted">
//                       No products found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         </Card.Body>

//         {/* Footer */}
//         <Card.Footer className="bg-white border-0 p-4">
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
//             <div className="text-muted small">
//               Showing <strong>{filteredProducts.length}</strong> products
//             </div>

//             <Pagination className="mb-0">
//               <Pagination.Prev />

//               <Pagination.Item active>1</Pagination.Item>

//               <Pagination.Item>2</Pagination.Item>

//               <Pagination.Item>3</Pagination.Item>

//               <Pagination.Next />
//             </Pagination>
//           </div>
//         </Card.Footer>
//       </Card>
//     </div>
//   );
// }

// export default ProductList;
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Table,
  Form,
  InputGroup,
  Button,
  Badge,
  Pagination,
  Dropdown,
  Image,
  Spinner,
} from "react-bootstrap";

import {
  Search,
  ChevronUp,
  ChevronDown,
  Pencil,
  Trash2,
  Download,
  Filter,
} from "lucide-react";

import { FaImage, FaPlus } from "react-icons/fa";

import noImage from "../../../../assets/images/prod_images.png";

import { Link } from "react-router-dom";

import { getProducts } from "../../../../services/productService";

import { MdCurrencyRupee } from "react-icons/md";

import Swal from "sweetalert2";

interface Product {
  id: number;

  image: string;

  product: string;

  sku: string;

  stock: string;

  price: number;

  category: string;

  tags: string;

  brand: string;

  date: string;
}

type SortField =
  | "product"
  | "sku"
  | "stock"
  | "price"
  | "category"
  | "tags"
  | "brand"
  | "date";

function ProductList() {
  const [search, setSearch] = useState<string>("");

  const [sortField, setSortField] = useState<SortField>("product");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [prducts_data, setProductsData] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      setProductsData(response?.data?.data || []);

      console.warn(response);
    } catch (error) {
      console.error("Error fetching products:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch products",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* DYNAMIC DATA MAP */
  const products: Product[] = useMemo(() => {
    return prducts_data.map((item: any) => ({
      id: item?.id,

      image:
        item?.featured_image || item?.product_image || item?.image || noImage,

      product: item?.product_name || item?.name || "N/A",

      sku: item?.sku || item?.product_sku || "N/A",

      stock:
        item?.stock_status ||
        (item?.stock_quantity > 10
          ? "In Stock"
          : item?.stock_quantity > 0
            ? "Low Stock"
            : "Out of Stock"),

      price: Number(item?.selling_price || item?.price || 0) || 0,

      category: item?.category_name || item?.category || "N/A",

      tags: Array.isArray(item?.tags)
        ? item.tags.join(", ")
        : item?.tags || "N/A",

      brand: item?.brand_name || item?.brand || "N/A",

      date: item?.created_at
        ? new Date(item.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A",
    }));
  }, [prducts_data]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);

      setSortOrder("asc");
    }
  };

  const filteredProducts = useMemo(() => {
    return [...products]
      .filter((item) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(search.toLowerCase()),
        ),
      )
      .sort((a, b) => {
        const valueA = a[sortField]?.toString().toLowerCase();

        const valueB = b[sortField]?.toString().toLowerCase();

        if (sortOrder === "asc") {
          return valueA > valueB ? 1 : -1;
        }

        return valueA < valueB ? 1 : -1;
      });
  }, [products, search, sortField, sortOrder]);

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;

    return sortOrder === "asc" ? (
      <ChevronUp size={16} className="ms-1" />
    ) : (
      <ChevronDown size={16} className="ms-1" />
    );
  };

  const getStockBadge = (stock: string) => {
    switch (stock) {
      case "In Stock":
        return <Badge bg="success">{stock}</Badge>;

      case "Low Stock":
        return <Badge bg="warning">{stock}</Badge>;

      case "Out of Stock":
        return <Badge bg="danger">{stock}</Badge>;

      default:
        return <Badge bg="secondary">{stock}</Badge>;
    }
  };

  const tableHeaders: SortField[] = [
    "product",
    "sku",
    "stock",
    "price",
    "category",
    "tags",
    "brand",
    "date",
  ];

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <Card className="border-0 shadow-sm rounded-2">
        {/* Header */}
        <Card.Header className="bg-white border-0 p-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <h2 className="fw-bold mb-1 text-dark">Product Management</h2>

              <p className="text-muted mb-0">
                Manage and monitor all product inventory
              </p>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {/* Search */}
              <InputGroup style={{ width: "280px" }}>
                <InputGroup.Text className="bg-white border-end-0">
                  <Search size={18} />
                </InputGroup.Text>

                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  className="border-start-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>

              {/* Filter */}
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  className="d-flex align-items-center gap-2"
                >
                  <Filter size={16} />
                  Filter
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>All Products</Dropdown.Item>

                  <Dropdown.Item>In Stock</Dropdown.Item>

                  <Dropdown.Item>Low Stock</Dropdown.Item>

                  <Dropdown.Item>Out of Stock</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Export */}
              <Button
                variant="outline-primary"
                className="d-flex align-items-center gap-2"
              >
                <Download size={16} />
                Export
              </Button>

              {/* Add Product */}
              <Link to="/admin/manage/product/add-new">
                <Button
                  style={{
                    backgroundColor: "#14468C",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  <FaPlus className="me-2" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        </Card.Header>

        {/* Table */}
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">
                    <Form.Check />
                  </th>

                  <th className="text-uppercase small fw-semibold text-muted">
                    <FaImage />
                  </th>

                  {tableHeaders.map((field) => (
                    <th
                      key={field}
                      onClick={() => handleSort(field)}
                      style={{
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                      className="small fw-bold text-dark"
                    >
                      <div className="d-flex align-items-center text-capitalize">
                        {field}
                        {renderSortIcon(field)}
                      </div>
                    </th>
                  ))}

                  <th className="small fw-bold text-dark">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={11} className="text-center py-5">
                      <Spinner animation="border" />
                    </td>
                  </tr>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <tr key={item.id}>
                      <td className="ps-4">
                        <Form.Check />
                      </td>

                      {/* Product Image */}
                      <td>
                        <Image
                          src={item.image}
                          alt={item.product}
                          rounded
                          fluid
                          onError={(e: any) => {
                            e.target.src = noImage;
                          }}
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            border: "1px solid #e9ecef",
                            maxWidth: "40px",
                            maxHeight: "40px",
                          }}
                        />
                      </td>

                      {/* Product */}
                      <td>
                        <div className="d-flex flex-column">
                          <small className="fw-semibold text-dark">
                            {item.product}
                          </small>

                          <small className="text-muted">
                            Product ID: #{item.id}
                          </small>
                        </div>
                      </td>

                      {/* SKU */}
                      <td>{item.sku}</td>

                      {/* Stock */}
                      <td>{getStockBadge(item.stock)}</td>

                      {/* Price */}
                      <td className="text-muted fw-semibold">
                        <MdCurrencyRupee />
                        {item.price.toLocaleString()}
                      </td>

                      {/* Category */}
                      <td>{item.category}</td>

                      {/* Tags */}
                      <td>{item.tags}</td>

                      {/* Brand */}
                      <td>{item.brand}</td>

                      {/* Date */}
                      <td>{item.date}</td>

                      {/* Actions */}
                      <td>
                        <div className="d-flex gap-2">
                          <Button size="sm" variant="outline-primary">
                            <Pencil size={16} />
                          </Button>

                          <Button size="sm" variant="outline-danger">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="text-center py-5 text-muted">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>

        {/* Footer */}
        <Card.Footer className="bg-white border-0 p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="text-muted small">
              Showing <strong>{filteredProducts.length}</strong> products
            </div>

            <Pagination className="mb-0">
              <Pagination.Prev />

              <Pagination.Item active>1</Pagination.Item>

              <Pagination.Item>2</Pagination.Item>

              <Pagination.Item>3</Pagination.Item>

              <Pagination.Next />
            </Pagination>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ProductList;
