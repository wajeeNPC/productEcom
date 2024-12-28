const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");

// Get all products route
router.get("/", getAllProducts);

// Get a single product by ID route
router.get("/:id", getProductById);

// Add a new product route
router.post("/add", createProduct);

// Update an existing product route
router.put("/:id", updateProduct);

// Delete a product by ID route
router.delete("/:id", deleteProduct);

module.exports = router;
