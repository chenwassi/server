
const Product = require('../models/productModel');
const Store =require('../models/storeModel');
const mongoose = require('mongoose');


// get all store in localhost:8000

const getProduct = async (req,res)=>{
    let data = await  Product.find({})
    return res.json(data)
}

// create store in localhost:8000

const createProducts = async (req,res) => {
  if(!req.body)return res.status(400).json('Post HTTP Data not Provided')
  try {
    const arr=req.body
    let products = arr.map(async (obj) => {
      const product = new Product(obj);
      const productId = product.id;
      const storeId = obj.storeId;
      await updateStoreProducts(storeId,productId)
      await product.save();
      return product;
    });

    products = Promise.all(products);

    res.status(200).json('product add')
  } catch (err) {
    res.status(500).json(r.message);
  }
};

  // this function is update the store when add product
const updateStoreProducts = async (storeId, productId) =>{
try {
    console.log(storeId, productId);
    await Store.findByIdAndUpdate(storeId,{$push:{products:{productId}}})
} catch (err) {
    throw `Err : ${err}`;
}
}

const updateProduct = async (req,res)=>{
  try {
    const obj = {
      name: req.body.name,
      img: req.body.img,
      quantity: req.body.quantity,
      price: req.body.price,
      productType: req.body.productType,
      description: req.body.description,
    };
    console.log(obj);
    const updateProducts = await Product.findByIdAndUpdate(
      req.params.id,
      {$set:obj}
      
    )
    res.status(200).json(updateProducts)
  } catch (error) {
    throw error
    
  }
}
  const deleteProduct = async (req, res) => {
    const productId=req.params.id
    if (!mongoose.Types.ObjectId.isValid(productId)){
      return res.status(404).send("not working")
    }
  
   const product= await Product.findByIdAndDelete(productId)
   const storeId = product.storeId.toString()
   console.log(storeId);
   
    await Store.findByIdAndUpdate(storeId,{$pull:{products:{productId}}})
    res.status(200).json('deleted product')
 
  }

module.exports = {
  getProduct,
  createProducts,
  updateProduct,
  deleteProduct

};
