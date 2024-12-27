const  Product   = require("../models/productSchema");
const Joi = require("joi")

const getAllProducts = async (req, res) => {
  try {

    const products = await Product.find();
    
    if(products.length === 0){
      return res.status(200).json({ message : "no products available"})
    }

     return res.status(200).json(products);

  } catch (error) {

    console.error("Error in getting all products", error.message);
    return res.status(500).json({ error: "Internal server error" });
    
  }
};

const getProductById = async (req,res) => {
  try{

    const productId = req.params.id;

    const productExist = await Product.findById(productId);

    if(!productExist){
      return res.status(200).json({ message : " product not found "})
    }

    return res.status(200).json(productExist);

  }catch(error){

    console.error("Error in getting product" , error.message);
    return res.status(500).json({ error: "Internal server error"})
  }
}

const createProduct = async (req,res) => {
  try{

    const productData = req.body.data;

    const {error} = validateProduct(productData);

    if(error){
      return res.status(400).json({message:error.details[0].message})
    }
    
    const newProduct = new Product(productData);
    await newProduct.save();

    return res.status(200).json({ message: "product created successfully" });
  }catch(error){

    console.error("Error in creating product" , error.message);
    return res.status(500).json({ error: "Internal server error"})

  }
}

const updateProduct = async (req,res) => {
  try{

    const productData = req.body.data;
    const productId = req.params.id;

    const {error} = validateProduct(productData);

    if(error){
      return res.status(400).json({message:error.details[0].message})
    }

    const productExist = await Product.findById(productId);

    if(!productExist){
      return res.status(404).json({message : "product not found"})
    }

    await Product.findByIdAndUpdate(productId,
      {$set: {
          ...productData,
          updatedAt: new Date()
        }
      },
      { new: true });
 
    return res.status(200).json({message: "Product updated successfully"});

  }catch(error){

    console.error("Error in updating product" , error.message);
    return res.status(500).json({ error: "Internal server error"})

  }
}

const deleteProduct = async (req,res) => {
  try{

    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if(!deletedProduct){
      return res.status(404).json({message : "product not found"})
    }

    return res.status(200).json({message : "product deleted succesfully"})

  }catch(error){

    console.error("Error in deleting product" , error.message);
    return res.status(500).json({ error: "Internal server error"})

  }
}


const validateProduct = (data) =>{
  const schema = Joi.object({
      name : Joi.string().required().label("Product Name"),
      description : Joi.string().required().label("Description Name"),
      price : Joi.number().required().label("Price"),
      stock : Joi.number().required().label("Stock"),
      category : Joi.string().required().label("Category"),
  });

  return schema.validate(data)
};



module.exports = {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct}

