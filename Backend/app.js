const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload= require('express-fileupload');
const app=express();
app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: true,
      optionsSuccessStatus: 200,
    })
  );
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())

// Import all the Routes
const products = require('./routes/product');
const user = require('./routes/user');
const seller = require('./routes/seller');
const order = require('./routes/order')
const stats = require("./routes/stats")
const design = require("./routes/design");

app.use('/products',products);
app.use('/user',user);
app.use('/seller',seller);
app.use('/order',order);
app.use('/stats',stats);
app.use('/design',design);
// Page not found middleware
app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: "Api not found.",
  };
  next(error);
});

// Global error handling middleware
app.use((err,req,res,next)=>{
  console.log(err);
  const status=err.status || 500;
  const message = err.message||"Internal server error.";
  const data = err.data||null;
  res.status(status).json({
    type:"error",
    message,
    data
  })
})


module.exports = app;