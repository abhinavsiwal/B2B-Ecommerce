const express = require('express');
const router = express.Router();

const {newProduct,getProducts,getProductById, updateProduct, deleteProduct} = require('../controllers/product-controller');
const { isAuthenticatedSeller } = require('../middlewares/checkSellerAuth');

router.get('/products',getProducts);
router.post('/product/new',isAuthenticatedSeller,newProduct);
router.get('/product/:id',getProductById);
router.put('/product/:id',isAuthenticatedSeller,updateProduct)
router.delete('/product/:id',isAuthenticatedSeller,deleteProduct)
module.exports = router;