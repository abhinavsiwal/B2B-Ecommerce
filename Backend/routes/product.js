const express = require('express');
const router = express.Router();

const {newProduct,getProducts} = require('../controllers/product-controller');
const { isAuthenticatedSeller } = require('../middlewares/checkSellerAuth');

router.get('/',getProducts);
router.post('/product/new',isAuthenticatedSeller,newProduct);
module.exports = router;