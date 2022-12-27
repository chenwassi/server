const {getStores, createStore, deleteStore, updateStore, getProductsStoreById}=require('../controller/storeController')
const router = require('express').Router()
const {generateAccessToken} =require('../config/authenticateToken')

router.get('/',getStores)//everyone
router.post('/',createStore)//permission to costumer and owner store
router.delete('/:id',deleteStore)//permission to admin and owner store
router.put('/:id',updateStore)//permission to admin and owner store
router.get('/:id',getProductsStoreById)//permission to admin and owner store


module.exports = router