const express = require("express");
const router = express.Router();

const {getAllProducts, getProductById, createProduct, deleteProduct, updateProduct} = require('../controller/productController');

//get all product route
router.get('/',getAllProducts)
router.get('/:id',getProductById)
router.post('/add',createProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)


module.exports = router
