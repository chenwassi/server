const routes = require('express').Router();
const storesController = require('../controller/storeController');
// const productController = require('../controller/productController')
const userController = require('../controller/usercontroller')
const orderController = require('../controller/orderController')


routes.route('/api/stores')
.post(storesController.createStore)//premission to costumer and ownerstore
.get(storesController.getStores)//everyone


routes.route('/api/orders')
     .get(orderController.getOrders)//premission to admin
     .post(orderController.createOrders)// premission to any user that log in

routes.route('/api/orders/:id')
     .get(orderController.getStoreOrCustomerOrderById)


// routes.route('/api/products')
//      .get(productController.getProduct)
//      .post(productController.createProduct)

routes.route('/api/stores/:id')
.delete(storesController.deleteStore)//premission to admin and owner store
.put(storesController.updateStore)//premission to admin and owner store
.get(storesController.getProductsStoreById)//premission to admin and owner store





routes.route('/api/users/register')
     .post(userController.createUser)
     .get(userController.getUsers)//premission to admin

routes.route('/api/users/login')
     .post(userController.login)



 

module.exports = routes