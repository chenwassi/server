const router = require('express').Router()
const { getOrders, createOrders, getStoreOrCustomerOrderById }= require('../controller/orderController')


router.get('/',getOrders)//permission to admin
router.post('/',createOrders)// permission to any user that log in
router.get('/:id',getStoreOrCustomerOrderById)









module.exports = router