const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

// Middleware to verify JWT token
router.use(authMiddleware.verifyToken);

// Add New product
router.post(
  "/products",
  authMiddleware.verifyToken,
  productController.addProduct
);

// Fetch product from 3rd party API
router.get("/products/external", productController.getProductFromExternalAPI);

module.exports = router;
