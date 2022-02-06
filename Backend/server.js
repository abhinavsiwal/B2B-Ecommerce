const app = require('./app');

app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port : ${process.env.PORT} in ${process.env.NODE_ENV}`);
})