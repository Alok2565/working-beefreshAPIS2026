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



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= FRONTEND ================= */}
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="shops" element={<ProductList />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:slug" element={<SingleBlog />} />
          <Route
            path="user/login"
            element={
              <ProtectedRoute publicOnly>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* USER */}
          <Route
            path="user/dashboard"
            element={
              <ProtectedRoute allowedRoles={ROLE.USER ? [ROLE.USER] : [2]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/manage/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/product/checkout"
            element={
              <ProtectedRoute allowedRoles={[ROLE.USER]}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/product/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/product/wishlist"
            element={
              <ProtectedRoute allowedRoles={[ROLE.USER]}>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/product/orders"
            element={
              <ProtectedRoute allowedRoles={[ROLE.USER]}>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route path="user/product/cart" element={<Cart />} />

          <Route
            path="user/product/change-password"
            element={<ChangePassword />}/>
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={ROLE.ADMIN ? [ROLE.ADMIN] : [1]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
         {AdminRoutes()}
        </Route>
        <Route path="*" element={<Page404Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import "./assets/css/dashboard.css";
// import "./assets/css/custom_app.css";
// import "./assets/css/auth_app.css";
// import Layouts from "./components/Layouts";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import ProductDetails from "./pages/ProductDetails";
// import Checkout from "./pages/Checkout";
// import Payment from "./pages/Payment";
// import ProductList from "./pages/ProductList";
// import Wishlist from "./pages/Wishlist";
// import Contact from "./pages/Contact";
// import About from "./pages/About";
// import Login from "./pages/auth/Login";
// import Blogs from "./pages/Blogs";
// import SingleBlog from "./pages/SingleBlog";
// import Page404Error from "./pages/Page404";
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import DashboardLayout from "./components/backend/layouts/DashboardLayout";
// import { ROLE } from "./utils/roleConfig";
// import Orders from "./pages/customer/Orders";
// // ADMIN
// import AdminDashboard from "./pages/backend/AdminDashboard";
// // CUSTOMER
// import CustomerDashboard from "./pages/customer/CustomerDashboard";
// import Users from "./pages/backend/manage/Users";
// import Roles from "./pages/backend/manage/Roles";
// import Profile from "./pages/auth/Profile";
// import ChangePassword from "./pages/auth/ChangePassword";
// import ManageOrders from "./pages/backend/manage/Products/Orders";
// import ManageProducts from "./pages/backend/manage/Products/Products";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layouts />}>
//           {/* ================= FRONTEND LAYOUT ================= */}
//           <Route index element={<Home />} />
//           <Route path="/about-us" element={<About />} />
//           <Route path="/contact-us" element={<Contact />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/product-details/:id" element={<ProductDetails />} />
//           <Route
//             path="user/manage/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="user/product/checkout"
//             element={
//               <ProtectedRoute allowedRoles={[ROLE.USER]}>
//                 <Checkout />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="user/product/payment"
//             element={
//               <ProtectedRoute>
//                 <Payment />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/shops" element={<ProductList />} />
//           <Route
//             path="user/product/wishlist"
//             element={
//               <ProtectedRoute allowedRoles={[ROLE.USER]}>
//                 <Wishlist />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="user/product/orders"
//             element={
//               <ProtectedRoute allowedRoles={[ROLE.USER]}>
//                 <Orders />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/user/login" element={<Login />} />
//           <Route path="/blogs" element={<Blogs />} />
//           <Route path="/blog/:slug" element={<SingleBlog />} />

//           {/* CUSTOMER ROUTES */}
//           <Route
//             path="user/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={[ROLE.USER]}>
//                 <CustomerDashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//         {/* ================= ADMIN LAYOUT ================= */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="admin/dashboard" element={<AdminDashboard />} />
//           <Route path="admin/manage/users" element={<Users />} />
//           <Route path="admin/manage/roles" element={<Roles />} />
//           <Route path="admin/manage/products" element={<ManageProducts />} />
//           <Route path="admin/manage/orders" element={<ManageOrders />} />
//           <Route path="admin/manage/profile" element={<Profile />} />
//           <Route
//             path="admin/manage/change-password"
//             element={<ChangePassword />}
//           />
//         </Route>
//         <Route path="*" element={<Page404Error />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
