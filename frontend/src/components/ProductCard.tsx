import { Card, Button } from "react-bootstrap";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import prod_image from "../assets/images/prod_images.png";

/* Product Type */
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty?: number;
};

function ProductCard() {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const product: Product = {
    id: 1,
    name: "Organic Natural Honey",
    price: 499,
    image: prod_image,
  };

  // 👉 Redirect to Product Details
  const handleProductClick = () => {
    navigate(`/product-details/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  const handleWishlist = () => {
    addToWishlist(product);
  };

  return (
    <>
    <div className="product-container">
    <Card className="shadow-sm h-100 position-relative">
      {/* Wishlist Button */}
      <Button
        variant="light"
        className="position-absolute top-0 end-0 m-2"
        onClick={handleWishlist}
      >
        <FaHeart />
      </Button>

      {/* Clickable Image */}
      <Card.Img
        variant="top"
        src={product.image}
        onClick={handleProductClick}
        style={{
          height: "220px",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />

      <Card.Body>
        {/* Clickable Title */}
        <Card.Title
          onClick={handleProductClick}
          style={{ cursor: "pointer" }}
        >
          {product.name}
        </Card.Title>

        {/* Rating */}
        <div className="mb-2 text-warning">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        {/* Price */}
        <Card.Text className="fw-bold text-success">
          ₹{product.price}
        </Card.Text>

        {/* Add To Cart */}
        <Button variant="warning" className="w-100" onClick={handleAddToCart}>
          <FaShoppingCart /> Add to Cart
        </Button>

        {/* Buy Now */}
        <Button variant="dark" className="w-100 mt-2" onClick={handleBuyNow}>
          Buy Now
        </Button>
      </Card.Body>
    </Card>
    </div>
    </>
  );
  
}

export default ProductCard;