import mongoose from "mongoose";
import dotenv from "dotenv";
import color from "colors";
import products from "./data/Products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
import users from "./data/user.js";

dotenv.config();

connectDB();

const importData = async () => {
    // every mongoose method returns a promise
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((p)=> {
            return {
                ...p, user:adminUser
            }
        });
        await Product.insertMany(sampleProducts);
        console.log("Data Imported".green.inverse);
        // process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
        
    }
}

const destroyData = async () => {
    // every mongoose method returns a promise
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        process.exit(1);
    }
}

// console.log(process.argv[2]); //The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched. The first element will be execPath. See process.argv0 if access to the original value of argv[0] is needed. The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional command-line arguments.
if(process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
