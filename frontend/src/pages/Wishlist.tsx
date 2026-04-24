import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Wishlist() {

  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const moveToCart = (item:any) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <Container className="mt-4">

      <h2 className="mb-4">My Wishlist</h2>

      {/* Empty Wishlist */}
      {wishlistItems.length === 0 ? (

        <div className="text-center mt-5">

          <h4>Your wishlist is empty ❤️</h4>

          <p>Add products you love to your wishlist.</p>

          <Button
            variant="dark"
            onClick={() => navigate("/shops")}
          >
            Shop Now
          </Button>

        </div>

      ) : (

        <Row>

          {wishlistItems.map((item:any) => (

            <Col md={3} key={item.id} className="mb-4">

              <Card>

                <Card.Img
                  src={item.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <Card.Body>

                  <Card.Title>{item.name}</Card.Title>

                  <Card.Text>₹{item.price}</Card.Text>

                  <Button
                    variant="warning"
                    className="w-100 mb-2"
                    onClick={() => moveToCart(item)}
                  >
                    Add To Cart
                  </Button>

                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </Button>

                </Card.Body>

              </Card>

            </Col>

          ))}

        </Row>

      )}

    </Container>
  );
}

export default Wishlist;