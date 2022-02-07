const express = require('express');
const cors = require('cors');
// const bodyParser = require("body-parser");
const app=express();
app.use(express.json());
// app.use(
//     cors({
//       credentials: true,
//       origin: origin,
//       optionsSuccessStatus: 200,
//     })
//   );
// app.use(bodyParser.json());
// Import all the Routes
const products = require('./routes/product');
const user = require('./routes/user')

app.use('/products',products);
app.use('/user',user);

module.exports = app;