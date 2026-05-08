// require("dotenv").config();
// const express = require("express");
// const errorHandler = require("./middlewares/errorMiddleware");
// const cors = require("cors");
// const app = express();
// // ✅ ADD CORS HERE (TOP)
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//   }),
// );

// // Optional but useful
// app.options("*", cors());

// // Middleware
// app.use(express.json());

// app.use("/api/roles", require("./routes/roleRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/auth", require("./routes/authRoutes"));

// app.use(errorHandler);

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
//   console.log(`Mode: ${process.env.NODE_ENV}`);
// });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const ipMiddleware = require("./middlewares/ipMiddleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ reusable middleware
app.use(ipMiddleware);

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/roles", require("./routes/roleRoutes"));

app.use("/api/permissions", require("./routes/permissionRoutes"));
app.use("/api/role_permissions", require("./routes/rolePermissionRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/home_banners", require("./routes/homebannerRoutes"));
// router.post("api/auth/verify-otp", authController.verifyLoginOtp);
app.use("/uploads", express.static(process.env.UPLOAD_BASE_PATH));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
