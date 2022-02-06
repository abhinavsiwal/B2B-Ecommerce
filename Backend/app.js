const express = require('express');
const app=express();
app.use(express.json());

// Import all the Routes
const products = require('./routes/product');


app.use('/products',products);
module.exports = app;