import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./assets/css/dashboard.css";
import "./assets/css/custom_app.css";
import "./assets/css/auth_app.css";
import Layouts from "./components/Layouts";
import DashboardLayout from "./components/backend/layouts/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import { ROLE } from "./utils/roleConfig";

// PUBLIC
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import Page404Error from "./pages/Page404";

// AUTH
import Login from "./pages/auth/Login";
import Profile from "./pages/auth/Profile";
import ChangePassword from "./pages/auth/ChangePassword";

// USER
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/customer/Orders";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import AdminRoutes from "./routes/AdminRoutes";
import PaymentSuccess from "./pages/customer/payments/PaymentSuccess";
import Order from "./pages/customer/orders/Order";
import Invoice from "./pages/customer/orders/Invoice";



function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     {/* ================= FRONTEND ================= */}
    //     <Route path="/" element={<Layouts />}>
    //       <Route index element={<Home />} />
    //       <Route path="about-us" element={<About />} />
    //       <Route path="contact-us" element={<Contact />} />
    //       <Route path="shops" element={<ProductList />} />
    //       <Route path="product-details/:id" element={<ProductDetails />} />
    //       <Route path="blogs" element={<Blogs />} />
    //       <Route path="blog/:slug" element={<SingleBlog />} />
    //       <Route
    //         path="user/login"
    //         element={
    //           <ProtectedRoute publicOnly>
    //             <Login />
    //           </ProtectedRoute>
    //         }
    //       />
    //       {/* USER */}
    //       <Route
    //         path="user/dashboard"
    //         element={
    //           <ProtectedRoute allowedRoles={ROLE.USER ? [ROLE.USER] : [2]}>
    //             <CustomerDashboard />
    //           </ProtectedRoute>
    //         }
    //       />

    //       <Route
    //         path="user/manage/profile"
    //         element={
    //           <ProtectedRoute>
    //             <Profile />
    //           </ProtectedRoute>
    //         }
    //       />

    //       <Route
    //         path="shop/product/checkout"
    //         element={
    //           <ProtectedRoute allowedRoles={[ROLE.USER]}>
    //             <Checkout />
    //           </ProtectedRoute>
    //         }
    //       />

    //       <Route
    //         path="shops/product/payment"
    //         element={
    //           <ProtectedRoute>
    //             <Payment />
    //           </ProtectedRoute>
    //         }
    //       />

    //       <Route
    //         path="shops/product/wishlist"
    //         element={
    //           <ProtectedRoute allowedRoles={[ROLE.USER]}>
    //             <Wishlist />
    //           </ProtectedRoute>
    //         }
    //       />

    //       <Route
    //         path="shops/product/orders"
    //         element={
    //           <ProtectedRoute allowedRoles={[ROLE.USER]}>
    //             <Orders />
    //           </ProtectedRoute>
    //         }
    //       />

    //       <Route path="shops/product/cart" element={<Cart />} />

    //       <Route
    //         path="use/product/change-password"
    //         element={<ChangePassword />}/>
    //     </Route>

    //     {/* ================= ADMIN ================= */}
    //     <Route
    //       path="/"
    //       element={
    //         <ProtectedRoute allowedRoles={ROLE.ADMIN ? [ROLE.ADMIN] : [1]}>
    //           <DashboardLayout />
    //         </ProtectedRoute>
    //       }
    //     >
    //      {AdminRoutes()}
    //     </Route>
    //     <Route path="*" element={<Page404Error />} />
    //   </Routes>
    // </BrowserRouter>
    <>
     <BrowserRouter>
      <Routes>
        {/* ================= FRONTEND ================= */}

        <Route path="/" element={<Layouts />}>
          {/* HOME */}
          <Route index element={<Home />} />

          {/* STATIC PAGES */}
          <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<Contact />} />

          {/* PRODUCTS */}
          <Route path="shops" element={<ProductList />} />

          <Route
            path="product-details/:id"
            element={<ProductDetails />}
          />

          {/* BLOGS */}
          <Route path="blogs" element={<Blogs />} />

          <Route path="blog/:slug" element={<SingleBlog />} />

          {/* LOGIN */}
          <Route
            path="user/login"
            element={
              <ProtectedRoute publicOnly>
                <Login />
              </ProtectedRoute>
            }
          />

          {/* ================= PUBLIC PAGES ================= */}

          {/* CART */}
          <Route path="shops/product/cart" element={<Cart />} />

          {/* ================= PROTECTED USER PAGES ================= */}

          {/* USER DASHBOARD */}
          <Route
            path="user/dashboard"
            element={
              <ProtectedRoute allowedRoles={[ROLE.USER]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}
          {/* PROFILE */}
<Route
  path="user/manage/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

          {/* CHANGE PASSWORD */}
          <Route
            path="user/change-password"
            element={
              <ProtectedRoute allowedRoles={[ROLE.USER]}>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* CHECKOUT */}
          <Route
  path="shops/product/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

          {/* PAYMENT */}
          <Route
            path="shops/orders/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
<Route path="shops/orders/payment/payment-success" 
element={
<ProtectedRoute>
  <PaymentSuccess/>
  </ProtectedRoute>
}/>
<Route path="shops/orders" element={
  <ProtectedRoute>
    <Order/>
  </ProtectedRoute>}/>
  <Route path="shops/orders/invoice" element={
    <ProtectedRoute>
      <Invoice/>
    </ProtectedRoute>
  }/>
         {/* WISHLIST */}
<Route
  path="shops/product/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>

          {/* ORDERS */}
          {/* ORDERS */}
<Route
  path="shops/product/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
        </Route>

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {AdminRoutes()}
        </Route>

        {/* 404 */}
        <Route path="*" element={<Page404Error />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
