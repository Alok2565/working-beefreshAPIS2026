import { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import img1 from "../assets/images/No_Image_Available.jpg";
import img2 from "../assets/images/prod_images.png";

function ProductDetails() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [qty, setQty] = useState<number>(1);

  const product = {
    id: 1,
    name: "Organic Honey",
    price: 499,
    images: [img1, img2, img1, img2],
  };

  const [mainImage, setMainImage] = useState<string>(product.images[0]);

  // ZOOM STATES
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setLensPosition({ x: x * 100, y: y * 100 });

    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x * 100}% ${y * 100}%`,
      backgroundSize: "400% 400%",
    });

    setZoomActive(true);
  };
  const handleMouseLeave = () => {
    setZoomActive(false);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ ...product, image: mainImage });
    }
    navigate("user/product/cart");
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ ...product, image: mainImage });
    }
    navigate("user/product/checkout");
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Row>
            <Col xs={2}>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  onMouseEnter={() => setMainImage(img)}
                  onClick={() => setMainImage(img)}
                  style={{
                    width: "100%",
                    height: "70px",
                    objectFit: "cover",
                    marginBottom: "10px",
                    cursor: "pointer",
                    border:
                      mainImage === img
                        ? "2px solid #ff7e5f"
                        : "1px solid #ddd",
                    borderRadius: "6px",
                  }}
                />
              ))}
            </Col>

            <Col xs={10}>
              <div className="zoom-wrapper">
                <div
                  className="zoom-container"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src={mainImage} className="zoom-image" />

                  <div
                    className={`zoom-lens ${zoomActive ? "active" : ""}`}
                    style={{
                      left: `${lensPosition.x}%`,
                      top: `${lensPosition.y}%`,
                    }}
                  />
                </div>

                <div
                  className={`zoom-preview ${zoomActive ? "active" : ""}`}
                  style={zoomStyle}
                />
              </div>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <h2>{product.name}</h2>

          <div className="text-warning mb-2">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>

          <h4 className="text-success">₹{product.price}</h4>

          <p>Pure organic honey collected from natural forests.</p>

          <div className="mb-3">
            <label>Quantity</label>
            <input
              type="number"
              value={qty}
              min="1"
              className="form-control"
              style={{ width: "120px" }}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <Button variant="warning" className="me-2" onClick={handleAddToCart}>
            <FaShoppingCart /> Add to Cart
          </Button>

          <Button variant="dark" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="p-4">
            <h4>Description</h4>
            <p>100% natural honey. No chemicals.</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
