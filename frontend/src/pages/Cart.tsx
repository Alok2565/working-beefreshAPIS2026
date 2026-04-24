import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {

  const { cartItems, removeItem } = useCart();

  /* Calculate totals */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const shipping = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <Container className="mt-4">

      <h2 className="mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (

        <div className="text-center mt-5">
          <FaShoppingCart size={60} className="text-secondary mb-3" />
          <h3>Your Cart is Empty</h3>
          <p>Add some products to your cart.</p>

          <Link to="/shops">
            <Button variant="warning">
              Shop Now
            </Button>
          </Link>
        </div>

      ) : (

        <Row>

          {/* Cart Items */}
          <Col md={8}>
            <Table bordered hover responsive>

              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>

                {cartItems.map((item) => (

                  <tr key={item.id}>

                    <td className="d-flex align-items-center gap-3">
                      <img
                        src={item.image}
                        width="80"
                        alt={item.name}
                      />
                      <span>{item.name}</span>
                    </td>

                    <td>₹{item.price}</td>

                    <td>{item.qty || 1}</td>

                    <td>₹{item.price * (item.qty || 1)}</td>

                    <td>
                      <Button
                        variant="danger"
                        onClick={() => removeItem(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </Table>
          </Col>

          {/* Order Summary */}
          <Col md={4}>
            <Card className="p-3 shadow-sm">

              <h4>Order Summary</h4>

              <hr />

              <Row>
                <Col>Subtotal</Col>
                <Col className="text-end">₹{subtotal}</Col>
              </Row>

              <Row>
                <Col>Shipping</Col>
                <Col className="text-end">₹{shipping}</Col>
              </Row>

              <Row className="fw-bold mt-2">
                <Col>Total</Col>
                <Col className="text-end">₹{total}</Col>
              </Row>

              <Link to="/checkout">
                <Button variant="warning" className="mt-3 w-100">
                  Proceed to Checkout
                </Button>
              </Link>

            </Card>
          </Col>

        </Row>

      )}

    </Container>
  );
}

export default Cart;