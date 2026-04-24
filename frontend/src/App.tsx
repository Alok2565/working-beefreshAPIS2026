import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./assets/css/custom_app.css";
import "./assets/css/auth_app.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Layouts from "./components/Layouts";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import ProductList from "./pages/ProductList";
import Wishlist from "./pages/Wishlist";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Page404Error from "./pages/Page404";
import SingleBlog from "./pages/SingleBlog";
import Blogs from "./pages/Blogs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/shops" element={<ProductList />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/blogs" element={<Blogs />} />
            {/* <Route path="/blog/:id" element={<SingleBlog />} /> */}
            <Route path="/blog/:slug" element={<SingleBlog />} />

            <Route
              path="admin/dashboard"
              element={<h2>Welcom to Admin Dashbaord!</h2>}
            />
            <Route
              path="user/dashboard"
              element={<h2>Welcom to User Dashbaord!</h2>}
            />
          </Route>
          <Route path="*" element={<Page404Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
