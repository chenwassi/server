const router = require('express').Router();
const { createUser, login, getUsers,getByEmail,updateUser } = require('../controller/usercontroller')

router.get('/',getUsers)
router.get('/email',getByEmail)
router.post('/register',createUser)//permission to admin
router.post('/login',login)
router.put('/updateUser/:id',updateUser)


module.exports = router
