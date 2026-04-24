// import { useState, useEffect, useRef } from "react";
// import {
//   Navbar,
//   Container,
//   Nav,
//   Row,
//   Col,
//   Form,
//   FormControl,
//   Button,
//   NavDropdown
// } from "react-bootstrap";

// import { FaHeart, FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";

// import Bee_Logo from "../assets/images/logo/Bee_logo.png";
// import Bee_shopping_cart from "../assets/images/logo/Be_cart.png";

// function Header() {

//   const { cartItems } = useCart();
//   const { wishlistItems } = useWishlist();

//   const lastScrollY = useRef(0);

//   const [showTopHeader, setShowTopHeader] = useState(true);
//   const [showMenu, setShowMenu] = useState(true);

//   useEffect(() => {

//     const handleScroll = () => {

//       const currentScroll = window.scrollY;

//       // SCROLL UP
//       if (currentScroll < lastScrollY.current) {
//         setShowTopHeader(true);
//         setShowMenu(true);
//       }

//       // SCROLL DOWN
//       else {
//         setShowTopHeader(false);
//         setShowMenu(false);
//       }

//       // always show when at top
//       if (currentScroll < 50) {
//         setShowTopHeader(true);
//         setShowMenu(true);
//       }

//       lastScrollY.current = currentScroll;
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);

//   }, []);

//   return (
//     <header>

//       {/* PROMOTION BAR */}
//       {showTopHeader && (
//         <section className="bg-dark text-white text-center py-1">
//           Promotion Bar / Offers
//         </section>
//       )}

//       {/* LOGO + SEARCH + ICONS */}
//       <section className="w-100 border-bottom py-2 bg-white sticky-top">
//         <Container fluid>

//           <Row className="align-items-center">

//             {/* Logo */}
//             <Col md={3}>
//               <Link to="/">
//                 <img src={Bee_Logo} alt="logo" style={{ height: "60px" }} />
//               </Link>
//             </Col>

//             {/* Search */}
//             <Col md={6}>
//               <Form className="d-flex">
//                 <FormControl
//                   type="search"
//                   placeholder="Search products..."
//                   className="me-2"
//                 />
//                 <Button variant="primary">Search</Button>
//               </Form>
//             </Col>

//             {/* Icons */}
//             <Col md={3} className="text-end">

//               {/* Wishlist */}
//               <Link to="/wishlist" className="position-relative me-3 wishlist">
//                 <FaHeart size={20} className="heart_wishlist" />
//                 {wishlistItems.length > 0 && (
//                   <span className="badge bg-dark position-absolute top-0 start-100 translate-middle">
//                     {wishlistItems.length}
//                   </span>
//                 )}
//               </Link>

//               {/* Login */}
//               <Link to="/login" className="me-3 text-dark text-decoration-none">
//                 <FaUser /> Login / Register
//               </Link>

//               {/* Cart */}
//               <Link
//                 to="/cart"
//                 className="position-relative text-dark text-decoration-none cart"
//               >
//                 <img
//                   src={Bee_shopping_cart}
//                   alt="shop_cart"
//                   style={{ width: "50px", height: "40px" }}
//                 />
//                 {cartItems.length > 0 && (
//                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </Link>

//             </Col>

//           </Row>

//         </Container>
//       </section>

//       {/* MAIN MENU */}
//       {showMenu && (
//         <Navbar bg="dark" expand="lg" className="border-bottom">

//           <Container>

//             <Navbar.Toggle aria-controls="main-navbar" />

//             <Navbar.Collapse id="main-navbar">

//               <Nav className="me-auto">

//                 <NavDropdown
//                   title={<span className="text-white">All Categories</span>}
//                   menuVariant="dark"
//                 >
//                   <NavDropdown.Item as={Link} to="/category/electronics">
//                     Electronics
//                   </NavDropdown.Item>

//                   <NavDropdown.Item as={Link} to="/category/fashion">
//                     Fashion
//                   </NavDropdown.Item>

//                   <NavDropdown.Item as={Link} to="/category/home-kitchen">
//                     Home & Kitchen
//                   </NavDropdown.Item>

//                   <NavDropdown.Item as={Link} to="/category/beauty">
//                     Beauty
//                   </NavDropdown.Item>
//                 </NavDropdown>

//                 <Nav.Link as={Link} to="/" className="text-white">
//                   Home
//                 </Nav.Link>

//                 <Nav.Link as={Link} to="/about" className="text-white">
//                   About Us
//                 </Nav.Link>

//                 <Nav.Link as={Link} to="/shops" className="text-white">
//                   Products
//                 </Nav.Link>

//                 <Nav.Link as={Link} to="/contact" className="text-white">
//                   Contact Us
//                 </Nav.Link>

//               </Nav>

//             </Navbar.Collapse>

//           </Container>

//         </Navbar>
//       )}

//     </header>
//   );
// }

// export default Header;
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
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Bee_Logo from "../assets/images/logo/bee_logo_new.png";
//import Bee_Logo from "../assets/images/logo/main_logo.png";
//import Bee_Logo from "../assets/images/logo/logo_white.png";
import Bee_shopping_cart from "../assets/images/logo/Be_cart.png";
import useMiniCart from "../hooks/useMiniCart";
import { IoIosCloseCircle } from "react-icons/io";


function Header() {
  const { cartItems, removeFromCart  } = useCart();
  const { wishlistItems } = useWishlist();
  const { isOpen, openCart, closeCart } = useMiniCart();
  const [isSticky, setIsSticky] = useState(false);
  const logoRef = useRef<HTMLDivElement | null>(null);
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
    0
  );
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
                    <img
                      src={Bee_Logo}
                      alt="logo"
                    />
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
                <Col md={3} className="text-end">
                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    className="position-relative me-3 wishlist text-decoration-none"
                  >
                    <span className="text-dark"> Wishlist</span>
                    <FaHeart size={20} className="heart_wishlist" />
                    {wishlistItems.length > 0 && (
                      <span className="badge bg-dark position-absolute top-0 start-100 translate-middle">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>

                  {/* Login */}
                  <Link
                    to={`user/login`}
                    className="me-3 text-dark text-decoration-none"
                  >
                    <FaUser />User Login
                  </Link>
                <Col className="position-relative d-inline-block"
                  onMouseEnter={openCart}
                  onMouseLeave={closeCart}>
                  <img
                    src={Bee_shopping_cart}
                    alt="cart"
                    style={{ width: "50px", cursor: "pointer" }}
                  />

                  {/* Badge */}
                  {cartCount > 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </span>
                  )}

                  {/* Mini Cart */}
                  {isOpen && (
                    <Col className="mini-cart-popup">
                      <h6 className="text-center">Cart Items</h6>

                      {cartItems.length === 0 ? (
                        <p className="text-center">Cart is empty</p>
                      ) : (
                        <>
                          {/* Scroll */}
                          <Col className="mini-cart-list">
                            {cartItems.map((item) => (
                              <Col key={item.id} className="mini-cart-item d-flex">
                                <img src={item.image} alt="" />
                                <Col className="mini-details">
                                  <p className="justify-content-between">
                                    <span className="p-2" style={{ fontSize:"15px", fontWeight:"bold" }}>{item.name}</span>
                                  <span className="text-danger inline-flex custom cursor-pointer">
                                    <IoIosCloseCircle onClick={() => removeFromCart(item.id)} className="hover:opacity-80 transition-opacity custom cursor-pointer" />
                                  </span>                                    </p>
                                  <p className="justify-content-between"><small>
                                    <span>Qty:{item.qty}</span>{" "}<span>₹{item.price}</span>  
                                  </small>
                                  </p>
                                </Col>
                                  
                              </Col>
                            ))}
                          </Col>

                          {/* Subtotal */}
                          <Col className="mini-subtotal">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                          </Col>

                          {/* Buttons */}
                          <Col className="mini-actions">
                            <Link to="/cart" className="view-cart-btn">
                              View Cart
                            </Link>
                            <Link to="/checkout" className="checkout-btn">
                              Checkout
                            </Link>
                          </Col>
                        </>
                      )}
                    </Col>
                  )}
                </Col>
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
  