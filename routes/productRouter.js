
const {getProduct,createProducts, updateProduct, deleteProduct} =require('../controller/productController') 
const {tokenMiddleware} =require('../config/authenticateToken')
const router = require('express').Router()


     router.get('/',getProduct)
     router.post('/',createProducts)
     router.put('/:id',updateProduct)
     router.delete('/:id',deleteProduct)
     router.get('/',getProduct)
     router.post('/',createProducts)//premission to admin and owner store
     router.put('/:id',updateProduct)//premission to admin and owner store
     router.delete('/:id',deleteProduct)//premission to admin and owner store


     module.exports = router
