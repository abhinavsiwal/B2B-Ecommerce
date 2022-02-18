const express = require('express');
const router = express.Router();

const {newProduct,getProducts,getProductById, updateProduct, deleteProduct, getProductBySellerId,getProductsByCategory} = require('../controllers/product-controller');
const { isAuthenticatedSeller } = require('../middlewares/checkSellerAuth');

router.get('/products',getProducts);
router.get('/category/:category',getProductsByCategory);
router.post('/product/new',isAuthenticatedSeller,newProduct);
router.get('/product/:id',getProductById);
router.put('/product/:id',isAuthenticatedSeller,updateProduct)
router.delete('/product/:id',isAuthenticatedSeller,deleteProduct)
router.get('/seller',isAuthenticatedSeller,getProductBySellerId);
module.exports = router;