// import { useState } from "react";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import { FaShoppingCart, FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import prod_noimage from "../assets/images/No_Image_Available.jpg";


// function ProductDetails() {

//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [qty, setQty] = useState(1);

//   const product = {
//     id: 1,
//     name: "Organic Honey",
//     price: 499,
//     image: prod_noimage

//   };

//   const handleAddToCart = () => {

//     for (let i = 0; i < qty; i++) {
//       addToCart(product);
//     }

//     navigate("/cart");
//   };

//   const handleBuyNow = () => {

//     for (let i = 0; i < qty; i++) {
//       addToCart(product);
//     }

//     navigate("/checkout");
//   };

//   return (
//     <Container fluid className="mt-4">

//       <Row>

//         {/* Product Image */}
//         <Col md={6}>
//           <img
//             src={product.image}
//             alt={product.name}
//             className="img-fluid rounded"
//           />
//         </Col>

//         {/* Product Info */}
//         <Col md={6}>

//           <h2>{product.name}</h2>

//           <div className="text-warning mb-2">
//             <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
//           </div>

//           <h4 className="text-success">₹{product.price}</h4>

//           <p>
//             Pure organic honey collected from natural forests.
//             Rich in nutrients and completely chemical free.
//           </p>

//           {/* Quantity */}
//           <div className="mb-3">
//             <label>Quantity</label>

//             <input
//               type="number"
//               value={qty}
//               min="1"
//               className="form-control"
//               style={{ width: "120px" }}
//               onChange={(e) => setQty(Number(e.target.value))}
//             />
//           </div>

//           {/* Add To Cart */}
//           <Button
//             variant="warning"
//             className="me-2"
//             onClick={handleAddToCart}
//           >
//             <FaShoppingCart /> Add to Cart
//           </Button>

//           {/* Buy Now */}
//           <Button
//             variant="dark"
//             onClick={handleBuyNow}
//           >
//             Buy Now
//           </Button>

//         </Col>

//       </Row>

//       {/* Product Description */}
//       <Row className="mt-5">

//         <Col md={12}>

//           <Card className="p-4">

//             <h4>Description</h4>

//             <p>
//               BeeFreshHoney organic honey is harvested directly from forest
//               beehives. It is 100% natural with no additives or preservatives.
//               Perfect for daily health, immunity boosting, and natural sweetness.
//             </p>

//             <h5>Benefits</h5>

//             <ul>
//               <li>Boosts immunity</li>
//               <li>Rich in antioxidants</li>
//               <li>Improves digestion</li>
//               <li>Natural energy source</li>
//             </ul>

//           </Card>

//         </Col>

//       </Row>

//     </Container>
//   );
// }

// export default ProductDetails;
// import { useState } from "react";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import { FaShoppingCart, FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import img1 from "../assets/images/No_Image_Available.jpg";
// import img2 from "../assets/images/prod_images.png";

// function ProductDetails() {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [qty, setQty] = useState(1);

//   // ✅ SAFE IMAGES ARRAY
//   const product = {
//     id: 1,
//     name: "Organic Honey",
//     price: 499,
//     images: [img1, img2, img1, img2]
//   };

//   // ✅ DEFAULT IMAGE
//   const [mainImage, setMainImage] = useState(product.images[0]);

//   const handleAddToCart = () => {
//     for (let i = 0; i < qty; i++) {
//       addToCart({ ...product, image: mainImage });
//     }
//     navigate("/cart");
//   };

//   const handleBuyNow = () => {
//     for (let i = 0; i < qty; i++) {
//       addToCart({ ...product, image: mainImage });
//     }
//     navigate("/checkout");
//   };

//   return (
//     <Container className="mt-4">
//       <Row>

//         {/* LEFT SIDE */}
//         <Col md={6}>
//           <Row>

//             {/* Thumbnails */}
//             <Col xs={3}>
//               {product.images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt="thumb"
//                   onMouseEnter={() => setMainImage(img)}  // ✅ hover
//                   onClick={() => setMainImage(img)}      // ✅ mobile support
//                   style={{
//                     width: "100%",
//                     height: "70px",
//                     objectFit: "cover",
//                     marginBottom: "10px",
//                     cursor: "pointer",
//                     border:
//                       mainImage === img
//                         ? "2px solid #ff7e5f"
//                         : "1px solid #ddd",
//                     borderRadius: "6px"
//                   }}
//                 />
//               ))}
//             </Col>

//             {/* Main Image */}
//             <Col xs={9}>
//             <Col className="single-product">
//               <img
//                 src={mainImage}
//                 alt="product"
//                 className="img-fluid rounded"
//                 style={{
//                   width: "100%",
//                   height: "400px",
//                   objectFit: "cover"
//                 }}
//               />
//               </Col>
//             </Col>

//           </Row>
//         </Col>

//         {/* RIGHT SIDE */}
//         <Col md={6}>
//           <h2>{product.name}</h2>

//           <div className="text-warning mb-2">
//             <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
//           </div>

//           <h4 className="text-success">₹{product.price}</h4>

//           <p>
//             Pure organic honey collected from natural forests.
//           </p>

//           {/* Quantity */}
//           <div className="mb-3">
//             <label>Quantity</label>
//             <input
//               type="number"
//               value={qty}
//               min="1"
//               className="form-control"
//               style={{ width: "120px" }}
//               onChange={(e) => setQty(Number(e.target.value))}
//             />
//           </div>

//           <Button variant="warning" className="me-2" onClick={handleAddToCart}>
//             <FaShoppingCart /> Add to Cart
//           </Button>

//           <Button variant="dark" onClick={handleBuyNow}>
//             Buy Now
//           </Button>
//         </Col>

//       </Row>

//       {/* Description */}
//       <Row className="mt-5">
//         <Col>
//           <Card className="p-4">
//             <h4>Description</h4>
//             <p>100% natural honey. No chemicals.</p>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ProductDetails;

// import { useState } from "react";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import { FaShoppingCart, FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// import img1 from "../assets/images/No_Image_Available.jpg";
// import img2 from "../assets/images/prod_images.png";

// function ProductDetails() {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [qty, setQty] = useState<number>(1);

//   const product = {
//     id: 1,
//     name: "Organic Honey",
//     price: 499,
//     images: [img1, img2, img1, img2],
//   };

//   const [mainImage, setMainImage] = useState<string>(product.images[0]);

//   // 🔥 ZOOM STATES
//   const [zoomActive, setZoomActive] = useState(false);
//   const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
//   const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });

//   // 🔥 MOUSE MOVE
//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const { left, top, width, height } =
//       e.currentTarget.getBoundingClientRect();

//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;

//     setLensPosition({ x, y });

//     setZoomStyle({
//       backgroundImage: `url(${mainImage})`,
//       backgroundPosition: `${x}% ${y}%`,
//       backgroundSize: "250% 250%",
//     });

//     setZoomActive(true);
//   };

//   const handleMouseLeave = () => {
//     setZoomActive(false);
//   };

//   // CART
//   const handleAddToCart = () => {
//     for (let i = 0; i < qty; i++) {
//       addToCart({ ...product, image: mainImage });
//     }
//     navigate("/cart");
//   };

//   const handleBuyNow = () => {
//     for (let i = 0; i < qty; i++) {
//       addToCart({ ...product, image: mainImage });
//     }
//     navigate("/checkout");
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         {/* LEFT SIDE */}
//         <Col md={6}>
//           <Row>
//             {/* THUMBNAILS */}
//             <Col xs={2}>
//               {product.images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt="thumb"
//                   onMouseEnter={() => setMainImage(img)}
//                   onClick={() => setMainImage(img)}
//                   style={{
//                     width: "100%",
//                     height: "70px",
//                     objectFit: "cover",
//                     marginBottom: "10px",
//                     cursor: "pointer",
//                     border:
//                       mainImage === img
//                         ? "2px solid #ff7e5f"
//                         : "1px solid #ddd",
//                     borderRadius: "6px",
//                   }}
//                 />
//               ))}
//             </Col>

//             {/* MAIN IMAGE */}
//             <Col xs={9}>
//   <div className="zoom-wrapper">
    
//     {/* MAIN IMAGE */}
//     <div
//       className="zoom-container"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       <img src={mainImage} className="zoom-image" />

//       {/* LENS */}
//       <div
//         className={`zoom-lens ${zoomActive ? "active" : ""}`}
//         style={{
//           left: `${lensPosition.x}%`,
//           top: `${lensPosition.y}%`,
//         }}
//       />
//     </div>

//     {/* ✅ PREVIEW (NOW SAFE) */}
//     <div
//       className={`zoom-preview ${zoomActive ? "active" : ""}`}
//       style={zoomStyle}
//     />

//   </div>
// </Col>
//           </Row>
//         </Col>

//         {/* RIGHT SIDE */}
//         <Col md={6}>
//           <h2>{product.name}</h2>

//           <div className="text-warning mb-2">
//             <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
//           </div>

//           <h4 className="text-success">₹{product.price}</h4>

//           <p>Pure organic honey collected from natural forests.</p>

//           {/* QUANTITY */}
//           <div className="mb-3">
//             <label>Quantity</label>
//             <input
//               type="number"
//               value={qty}
//               min="1"
//               className="form-control"
//               style={{ width: "120px" }}
//               onChange={(e) => setQty(Number(e.target.value))}
//             />
//           </div>

//           <Button
//             variant="warning"
//             className="me-2"
//             onClick={handleAddToCart}
//           >
//             <FaShoppingCart /> Add to Cart
//           </Button>

//           <Button variant="dark" onClick={handleBuyNow}>
//             Buy Now
//           </Button>
//         </Col>
//       </Row>

//       {/* DESCRIPTION */}
//       <Row className="mt-5">
//         <Col>
//           <Card className="p-4">
//             <h4>Description</h4>
//             <p>100% natural honey. No chemicals.</p>
//           </Card>
//         </Col>
//       </Row>

//       {/* 🔥 RIGHT SIDE ZOOM BOX */}
//       <div
//         className={`zoom-preview ${zoomActive ? "active" : ""}`}
//         style={zoomStyle}
//       />
//     </Container>
//   );
// }

// export default ProductDetails;

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

  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const { left, top, width, height } =
  //     e.currentTarget.getBoundingClientRect();

  //   const x = ((e.clientX - left) / width) * 100;
  //   const y = ((e.clientY - top) / height) * 100;

  //   setLensPosition({ x, y });

  //   setZoomStyle({
  //     backgroundImage: `url(${mainImage})`,
  //     backgroundPosition: `${x}% ${y}%`,
  //     backgroundSize: "250% 250%",
  //   });

  //   setZoomActive(true);
  // };
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const { left, top, width, height } =
    e.currentTarget.getBoundingClientRect();

  const x = (e.clientX - left) / width;
  const y = (e.clientY - top) / height;

  setLensPosition({ x: x * 100, y: y * 100 });

  setZoomStyle({
    backgroundImage: `url(${mainImage})`,
    backgroundPosition: `${x * 100}% ${y * 100}%`,
    backgroundSize: "400% 400%", // 🔥 important
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
    navigate("/cart");
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ ...product, image: mainImage });
    }
    navigate("/checkout");
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* LEFT SIDE */}
        <Col md={6}>
          <Row>
            {/* THUMBNAILS */}
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

            {/* IMAGE + ZOOM */}
            <Col xs={10}>
              <div className="zoom-wrapper">
                
                {/* MAIN IMAGE */}
                <div
                  className="zoom-container"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src={mainImage} className="zoom-image" />

                  {/* LENS */}
                  <div
                    className={`zoom-lens ${
                      zoomActive ? "active" : ""
                    }`}
                    style={{
                      left: `${lensPosition.x}%`,
                      top: `${lensPosition.y}%`,
                    }}
                  />
                </div>

                {/* ✅ SINGLE PREVIEW ONLY */}
                <div
                  className={`zoom-preview ${
                    zoomActive ? "active" : ""
                  }`}
                  style={zoomStyle}
                />

              </div>
            </Col>
          </Row>
        </Col>

        {/* RIGHT SIDE */}
        <Col md={6}>
          <h2>{product.name}</h2>

          <div className="text-warning mb-2">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
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

          <Button
            variant="warning"
            className="me-2"
            onClick={handleAddToCart}
          >
            <FaShoppingCart /> Add to Cart
          </Button>

          <Button variant="dark" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </Col>
      </Row>

      {/* DESCRIPTION */}
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