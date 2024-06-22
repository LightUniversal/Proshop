import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(conn.connection.host + ` is the mongodb connection host`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        // process.exit(1); //stops the above process from running

    }   
}

export default connectDB;
