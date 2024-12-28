const Product = require("../models/productSchema");
const Joi = require("joi"); // Import Joi for validation

// Get all products function
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(200).json({ message: "no products available" });
    }

    return res.status(200).json(products);
  } catch (error) {
    // Log error and return a 500 internal server error
    console.error("Error in getting all products", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get a product by ID function
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const productExist = await Product.findById(productId);

    if (!productExist) {
      return res.status(200).json({ message: " product not found " });
    }

    return res.status(200).json(productExist);
  } catch (error) {
    // Log error and return a 500 internal server error
    console.error("Error in getting product", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new product function
const createProduct = async (req, res) => {
  try {
    const productData = req.body.data;

    // Validate the product data using Joi
    const { error } = validateProduct(productData);

    if (error) {
      // If validation fails, return an error message
      return res.status(400).json({ message: error.details[0].message });
    }

    const newProduct = new Product(productData);
    await newProduct.save();

    return res.status(200).json({ message: "product created successfully" });
  } catch (error) {
    console.error("Error in creating product", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing product function
const updateProduct = async (req, res) => {
  try {
    const productData = req.body.data;
    const productId = req.params.id;

    // Validate the updated product data using Joi
    const { error } = validateProduct(productData);

    if (error) {
      // If validation fails, return an error message
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the product exists
    const productExist = await Product.findById(productId);

    if (!productExist) {
      return res.status(404).json({ message: "product not found" });
    }

    await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          ...productData,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error in updating product", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a product function
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "product not found" });
    }

    return res.status(200).json({ message: "product deleted succesfully" });
  } catch (error) {
    console.error("Error in deleting product", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Product validation function using Joi
const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Product Name"), // Product name should be a string and required
    description: Joi.string().required().label("Description Name"), // Product description should be a string and required
    price: Joi.number().required().label("Price"), // Price should be a number and required
    stock: Joi.number().required().label("Stock"), // Stock should be a number and required
    category: Joi.string().required().label("Category"), // Category should be a string and required
  });

  return schema.validate(data);// Validate the product data using the schema
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
