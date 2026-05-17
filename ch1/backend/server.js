// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const errorHandler = require("./middlewares/errorMiddleware");
// const ipMiddleware = require("./middlewares/ipMiddleware");

// const session = require("express-session");
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: "mysecretkey",

//     resave: false,

//     saveUninitialized: true,

//     cookie: {
//       secure: false,

//       httpOnly: true,

//       maxAge: 24 * 60 * 60 * 1000,
//     },
//   }),
// );
// app.use(
//   cors({
//     origin: "http://localhost:5173",

//     credentials: true,
//   }),
// );
// app.use(ipMiddleware);

// app.use("/api/auth", require("./routes/authRoutes"));

// app.use("/api/roles", require("./routes/roleRoutes"));

// app.use("/api/permissions", require("./routes/permissionRoutes"));
// app.use("/api/role_permissions", require("./routes/rolePermissionRoutes"));

// app.use("/api/users", require("./routes/userRoutes"));

// app.use("/api/home_banners", require("./routes/homebannerRoutes"));
// // router.post("api/auth/verify-otp", authController.verifyLoginOtp);

// app.use("/api/category", require("./routes/categoryRoutes"));

// app.use("/uploads", express.static(process.env.UPLOAD_BASE_PATH));

// app.use(errorHandler);

// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//   }),
// );
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
require("dotenv").config();

const express = require("express");

const cors = require("cors");

const session = require("express-session");

const errorHandler = require("./middlewares/errorMiddleware");

const ipMiddleware = require("./middlewares/ipMiddleware");

const app = express();

// ================= CORS =================

app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  }),
);

// ================= BODY PARSER =================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ================= SESSION =================

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(ipMiddleware);

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/roles", require("./routes/roleRoutes"));

app.use("/api/permissions", require("./routes/permissionRoutes"));

app.use("/api/role_permissions", require("./routes/rolePermissionRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/home_banners", require("./routes/homebannerRoutes"));

app.use("/api/category", require("./routes/categoryRoutes"));

app.use("/api/flavors", require("./routes/flavorRoutes"));

app.use("/api/flavors", require("./routes/flavorRoutes"));

app.use("/api/packaging_types", require("./routes/packagingTypeRoutes"));

app.use("/api/purities", require("./routes/purityRoutes"));

app.use("/api/weight_units", require("./routes/weightUnitRoutes"));

app.use("/api/product_attributes", require("./routes/productAttributeRoutes"));

app.use("/api/attribute_values", require("./routes/attributeValueRoutes"));

app.use("/uploads", express.static(process.env.UPLOAD_BASE_PATH));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
