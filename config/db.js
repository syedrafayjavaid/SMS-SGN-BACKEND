const mongoose = require('mongoose');



const connectDB = async () => {

    console.log("The url is", process.env.LOCAL_MONGODB_URI);
    try {
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/SMS', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB  successfully connected to ${connect.connection.host}`)
    } catch (error) {
        console.log('Connection could not be created, possible cause: ' + error.message);
    }

}

module.exports = connectDB;