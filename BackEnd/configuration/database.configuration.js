import { response } from "express";
import mongoose from "mongoose";

const databaseConnection = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Database Connected Successful");
    }
     catch(error){
        console.log(`MongoDB Error : ${error}`);
        response.send(500).send({
            success : false,
            message : `${error.message}`
        });
    }
    
}

export { databaseConnection }

