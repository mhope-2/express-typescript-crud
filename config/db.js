const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000

const connectDB = async ()=>{

    const connect = await mongoose.connect(process.env.ATLAS_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(()=>{
        console.log(`MongoDB database connection established successfully`);
    }).catch((error)=>{
        console.log("MongoDB not connected");
        console.log(error);
    });
}

module.exports = connectDB;