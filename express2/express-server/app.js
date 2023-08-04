const express = require("express");
const connectDB = require("./src/db");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");

const app = express();

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port 8000`);
});
