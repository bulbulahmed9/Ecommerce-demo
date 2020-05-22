const router = require('express').Router()
const {order, getAllOrderByUser} = require('../controllers/orderController')
const auth = require('../middleware/auth')

// access : private 
// route : api/product/order 

router.post('/api/product/order', auth, order)


router.get('/api/user/order', auth, getAllOrderByUser)

module.exports = router