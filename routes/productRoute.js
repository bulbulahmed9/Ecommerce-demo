const router = require("express").Router();
const {
  addProduct,
  getProduct
} = require("../controllers/productController");

// @route   POST api/products
// @description   Add product
// @access  Admin

// uncomment below route to add product to database

// router.post('/api/products', addProduct) 

// @route   GET api/products
// @description   get product
// @access  Public

router.get("/api/products", getProduct);

module.exports = router;