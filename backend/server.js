require("dotenv").config();

const express = require("express");
const app = express();
//const roleRoutes = require("./routes/roleRoutes");
// const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

app.use(express.json());

app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV}`);
});
