import { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import prod_image from "../assets/images/prod_images.png";
import usePageTitle from "../hooks/usePageTitle";

function ProductList() {
  usePageTitle("Shops");

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  const products = [
    { id: 1, name: "Organic Honey", price: 499, image: prod_image },
    { id: 2, name: "Forest Honey", price: 599, image: prod_image },
    { id: 3, name: "Wild Honey", price: 699, image: prod_image },
    { id: 4, name: "Natural Honey", price: 549, image: prod_image },
    { id: 5, name: "Wild Honey", price: 699, image: prod_image },
    { id: 6, name: "Natural Honey", price: 549, image: prod_image },
    { id: 7, name: "Wild Honey", price: 699, image: prod_image },
    { id: 8, name: "Natural Honey", price: 549, image: prod_image },
    { id: 9, name: "Organic Honey", price: 499, image: prod_image },
    { id: 10, name: "Forest Honey", price: 599, image: prod_image },
    { id: 11, name: "Wild Honey", price: 699, image: prod_image },
    { id: 12, name: "Natural Honey", price: 549, image: prod_image },
    { id: 13, name: "Wild Honey", price: 699, image: prod_image },
    { id: 14, name: "Natural Honey", price: 549, image: prod_image },
    { id: 15, name: "Wild Honey", price: 699, image: prod_image },
    { id: 16, name: "Natural Honey", price: 549, image: prod_image }
  ];

  // ✅ PRODUCT CLICK
  const handleProductClick = (id: number) => {
    navigate(`/product-details/${id}`);
  };

  const handleAddToCart = (product: any) => addToCart(product);

  const handleBuyNow = (product: any) => {
    addToCart(product);
    navigate("/checkout");
  };

  const handleWishlist = (product: any) => addToWishlist(product);

  // ✅ LOAD MORE WITH DOT ANIMATION
  const loadMore = () => {
    setLoading(true);

    let dotCount = 0;

    const interval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setDots(".".repeat(dotCount));
    }, 300);

    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
      clearInterval(interval);
      setDots("");
    }, 1200);
  };

  return (
    <Container fluid className="mt-4">
      <Row>

        {/* Sidebar */}
        <Col lg={2} className="mb-4">
          <Card className="p-3 shadow-sm">
            <h5>Filter Products</h5>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  <option>All</option>
                  <option>Wild Honey</option>
                  <option>Organic Honey</option>
                  <option>Forest Honey</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price Range</Form.Label>
                <Form.Control type="range" />
              </Form.Group>

              <Form.Check type="checkbox" label="In Stock" />
            </Form>
          </Card>
        </Col>

        {/* Product Section */}
        <Col lg={10}>

          {/* Search + Sort */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control type="text" placeholder="Search products..." />
            </Col>

            <Col md={6} className="text-end">
              <Form.Select style={{ width: "200px", float: "right" }}>
                <option>Sort by</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Product Grid */}
          <Row xs={2} sm={3} md={4} lg={5} className="g-3">
            {products.slice(0, visibleCount).map((product) => (
              <Col key={product.id}>
                <Card className="h-100 shadow-sm position-relative">

                  {/* Wishlist */}
                  <Button
                    variant="light"
                    className="position-absolute top-0 end-0 m-2"
                    onClick={() => handleWishlist(product)}
                  >
                    <FaHeart />
                  </Button>

                  {/* ✅ CLICKABLE IMAGE */}
                  <Card.Img
                    src={product.image}
                    alt={product.name}
                    onClick={() => handleProductClick(product.id)}
                    style={{ cursor: "pointer" }}
                  />

                  <Card.Body>

                    {/* ✅ CLICKABLE TITLE */}
                    <Card.Title
                      onClick={() => handleProductClick(product.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {product.name}
                    </Card.Title>

                    <Card.Text className="text-success fw-bold">
                      ₹{product.price}
                    </Card.Text>

                    <Button
                      variant="warning"
                      className="w-100"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart /> Add to Cart
                    </Button>

                    <Button
                      variant="dark"
                      className="w-100 mt-2"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </Button>

                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* LOAD MORE */}
          {visibleCount < products.length && (
            <div className="text-center mt-4">
              <Button variant="outline-dark" onClick={loadMore} disabled={loading}>
                {loading ? `Loading${dots}` : "Load More"}
              </Button>
            </div>
          )}

        </Col>
      </Row>
    </Container>
  );
}

export default ProductList;