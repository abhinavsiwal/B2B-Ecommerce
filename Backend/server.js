const app = require('./app');
const connectDatabase = require('./configs/database')

const cloudinary = require('cloudinary');

// Setting up cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port : ${process.env.PORT} in ${process.env.NODE_ENV}`);
})