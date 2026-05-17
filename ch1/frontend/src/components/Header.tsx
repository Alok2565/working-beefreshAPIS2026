import { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";

import { FaHeart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Bee_Logo from "../assets/images/logo/bee_logo_new.png";
//import Bee_Logo from "../assets/images/logo/main_logo.png";
//import Bee_Logo from "../assets/images/logo/logo_white.png";
import Bee_shopping_cart from "../assets/images/logo/Be_cart.png";
import useMiniCart from "../hooks/useMiniCart";
import { IoIosCloseCircle } from "react-icons/io";
import { isAuthenticated, logout, getUser } from "../utils/auth";

function Header() {
  const navigate = useNavigate();
  const isLogin = isAuthenticated();
  const user = getUser();
  
  const { cartItems, removeFromCart } = useCart();
  const { wishlistItems } = useWishlist();
  const { isOpen, openCart, closeCart } = useMiniCart();
  const [isSticky, setIsSticky] = useState(false);
  const logoRef = useRef<HTMLDivElement | null>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    const handleScroll = () => {
      if (logoRef.current) {
        const offsetTop = logoRef.current.offsetTop;

        if (window.scrollY > offsetTop) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // const roles = ['admin', 'user', 'customer'];
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const userRoleId = Number(user?.role_id);

// let profileUrl = "/user/manage/profile";

let profileUrl = "";
if (userRoleId === 1) {
  profileUrl = "/admin/manage/profile";
} else if(userRoleId === 2) {
  profileUrl = "/user/manage/profile";
}else{
  navigate("/");
}
  console.log(userRoleId);
  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <>
      <header>
        <section className="bg-dark text-white text-center">
          <Col className="top-header">Promotion Bar / Offers</Col>
        </section>
        <section className="w-100 border-bottom">
          <Col
            className={`logo-section ${isSticky ? "fixed" : ""}`}
            ref={logoRef}
          >
            <Container fluid>
  <Row className="align-items-center">
    {/* Logo */}
    <Col md={3}>
      <Link to="/">
        <img src={Bee_Logo} alt="logo" />
      </Link>
    </Col>

    {/* Search */}
    <Col md={6}>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search products..."
          className="me-2"
        />

        <Button variant="primary">Search</Button>
      </Form>
    </Col>

    {/* Icons */}
    <Col
      md={3}
      className="text-end d-flex align-items-center justify-content-end gap-3 position-relative"
    >
      {/* Wishlist */}
      <Link
        to="/shops/product/wishlist"
        className="position-relative wishlist text-decoration-none d-flex align-items-center gap-1"
      >
        <span className="text-dark">Wishlist</span>

        <FaHeart size={20} className="heart_wishlist" />

        {wishlistItems.length > 0 && (
          <span className="badge bg-dark position-absolute top-0 start-100 translate-middle">
            {wishlistItems.length}
          </span>
        )}
      </Link>

      {/* ACCOUNT MENU */}
      <div
        className="account-menu-wrapper"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {/* Trigger */}
        <div className="account-trigger text-start">
          <div style={{ fontSize: "12px" }}>
            {isLogin ? (
              <div>Hello, {user?.email || "User"}</div>
            ) : (
              <div>Hello, Sign in</div>
            )}
          </div>

          <div style={{ fontWeight: 600 }}>
            Account & Lists
          </div>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="account-dropdown">
            {!isLogin ? (
              <>
                <div className="px-3 py-2">
                  <Link to="/user/login">
                    <Button
                      variant="warning"
                      size="sm"
                      className="w-100"
                    >
                      Sign in
                    </Button>
                  </Link>
                </div>

                <div className="text-center mb-2 small">
                  New customer?{" "}
                  <Link to="/user/register">
                    signup Here
                  </Link>
                </div>

                <hr />
              </>
            ) : (
              <>
                <div className="px-3 small">
                  <FaUser className="me-1" /> {user?.name}
                </div>

                <hr />
              </>
            )}

            {/* PROFILE */}
            
            <Link
              to={profileUrl}
              className="dropdown-item text-start link-item"
            >
              Profile
            </Link>

            {/* ACCOUNT */}
            <Link
              to="/account"
              className="dropdown-item text-start link-item"
            >
              Your Account
            </Link>

            {/* ORDERS */}
            <Link
              to="/shops/product/orders"
              className="dropdown-item text-start link-item"
            >
              Orders
            </Link>

            {/* WISHLIST */}
            <Link
              to="/shops/product/wishlist"
              className="dropdown-item text-start link-item mb-2"
            >
              Wishlist
            </Link>

            {isLogin && (
              <>
                <hr />

                <div
                  className="dropdown-item text-danger text-start link-item"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* CART */}
      <div
        className="cart-wrapper position-relative d-inline-block"
        onMouseEnter={openCart}
        onMouseLeave={closeCart}
      >
        <img
          src={Bee_shopping_cart}
          alt="cart"
          style={{
            width: "50px",
            cursor: "pointer",
          }}
        />

        {cartCount > 0 && (
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {cartCount}
          </span>
        )}

        {/* MINI CART */}
        {isOpen && (
          <div className="mini-cart-popup">
            <h6 className="text-center">
              Cart Items
            </h6>

            {cartItems.length === 0 ? (
              <p className="text-center">
                Cart is empty
              </p>
            ) : (
              <>
                <div className="mini-cart-list">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="mini-cart-item"
                    >
                      <img src={item.image} alt="" />

                      <div className="mini-details">
                        <div className="mini-top">
                          <span className="product-name">
                            {item.name}
                          </span>

                          <IoIosCloseCircle
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            className="remove-icon"
                          />
                        </div>

                        <div className="mini-bottom">
                          Qty: {item.qty} | ₹
                          {item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mini-subtotal">
                  <span>Subtotal</span>

                  <span>₹{subtotal}</span>
                </div>

                <div className="mini-actions">
                  {/* VIEW CART */}
                  <Link
                    to="/shops/product/cart"
                    className="view-cart-btn"
                  >
                    View Cart
                  </Link>

                  {/* CHECKOUT */}
                  <Link
                    to="/shops/product/checkout"
                    className="checkout-btn"
                  >
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Col>
  </Row>
</Container>
          </Col>
        </section>
        <section className="w-100 main-menu menu-bottom bg-dark">
          <Container>
            <Navbar expand="lg" className="main-menu bg-dark">
              <Container>
                <Navbar.Toggle aria-controls="main-navbar" />

                <Navbar.Collapse id="main-navbar">
                  <Nav className="me-auto gap-3">
                    <NavDropdown
                      title={<span className="text-white">All Categories</span>}
                      menuVariant="dark"
                    >
                      <NavDropdown.Item as={Link} to="/category/electronics">
                        Electronics
                      </NavDropdown.Item>

                      <NavDropdown.Item as={Link} to="/category/fashion">
                        Fashion
                      </NavDropdown.Item>

                      <NavDropdown.Item as={Link} to="/category/home-kitchen">
                        Home & Kitchen
                      </NavDropdown.Item>

                      <NavDropdown.Item as={Link} to="/category/beauty">
                        Beauty
                      </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link as={Link} to="/" className="text-white">
                      Home
                    </Nav.Link>

                    <Nav.Link as={Link} to="/about-us" className="text-white">
                      About Us
                    </Nav.Link>

                    <Nav.Link as={Link} to="/shops" className="text-white">
                      Products
                    </Nav.Link>
                    <Nav.Link as={Link} to="/blogs" className="text-white">
                      Blogs
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contact-us" className="text-white">
                      Contact Us
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Container>
        </section>
      </header>
    </>
  );
}

export default Header;
