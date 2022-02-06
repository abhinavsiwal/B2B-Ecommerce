const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const db = await mongoose.connect(
            `mongodb+srv://abhinav_siwal:${process.env.DB_PASSWORD}@cluster0.nutdw.mongodb.net/development?retryWrites=true&w=majority`
          );       
          console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
 
};


module.exports = connectDatabase;