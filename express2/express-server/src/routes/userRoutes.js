const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

// Registration API endpoint
router.post("/register", userController.registerUser);

// Login API endpoint
router.post("/login", authController.loginUser);

// Middleware to verify JWT token
router.use(authMiddleware.verifyToken);

// Protected APIs (require authentication)
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
// Forget Password
router.post("/forgot-password", authController.forgotPassword);

// Add New product
router.post(
  "/products",
  authMiddleware.verifyToken,
  productController.addProduct
);

module.exports = router;
